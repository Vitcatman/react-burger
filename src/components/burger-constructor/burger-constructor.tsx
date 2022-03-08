import { useState, useContext } from "react";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { IngredientsContext } from "../../services/ingredients-context";
import { OrderContext } from "../../services/order-context";

const BurgerConstructor = () => {
  const { state } = useContext(IngredientsContext);
  const ingr = state.ingredients.filter((item) => item.type !== "bun");
  const bun = state.ingredients.find((item) => item.type === "bun");
  const finalPrice = ingr.reduce(
    (total, curValue) => total + curValue.price,
    bun.price * 2
  );

  const [active, setActive] = useState(false);
  const [orderNumber, setOrderNumber] = useState(0);
  const toggleModal = () => setActive(!active);

  const placeOrder = async () => {
    try {
      const res = await fetch("https://norma.nomoreparties.space/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredients: state.ingredients.map((el) => el._id),
        }),
      });
      if (!res.ok) {
        throw new Error("Ошибка отправки");
      }
      const newOrder = await res.json();
      setOrderNumber(newOrder.order.number);
      toggleModal();
    } catch (error) {
      setOrderNumber(0);
      console.log(error);
    }
  };

  return (
    <section className={`${styles.container} mt-25`}>
      {active && (
        <Modal close={toggleModal}>
          <OrderContext.Provider value={orderNumber}>
            <OrderDetails />
          </OrderContext.Provider>
        </Modal>
      )}
      <div className={`ml-7 pl-5`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
      <ul className={`${styles.cart} custom-scroll`}>
        {ingr.map((el) => {
          if (el.type !== "bun") {
            return (
              <li className={`${styles.listitem} mb-4 ml-4`} key={el._id}>
                <div className={"mr-2"}>
                  <DragIcon type="primary" />
                </div>
                <ConstructorElement
                  text={el.name}
                  price={el.price}
                  thumbnail={el.image}
                />
              </li>
            );
          } else {
            return null;
          }
        })}
      </ul>
      <div className={`ml-7 pl-5`}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
      <div className={`${styles.total} mr-4 mt-10`}>
        <div className={`mr-10`}>
          <span className={"text text_type_digits-medium mr-2"}>
            {finalPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium" onClick={placeOrder}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
