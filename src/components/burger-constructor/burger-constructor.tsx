import { useState } from "react";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ingredientPropTypes from "../../utils/proptypes";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

const BurgerConstructor = (props) => {
  const ingredients = props.data.filter((item) => item.type !== "bun");
  const bun = props.data.find((item) => item.type === "bun");
  const finalPrice = ingredients.reduce(
    (total, curValue) => total + curValue.price,
    bun.price * 2
  );
  const [active, setActive] = useState(false);
  const toggleModal = () => setActive(!active);

  return (
    <section className={`${styles.container} mt-25`}>
      {active && (
        <Modal close={toggleModal}>
          <OrderDetails />
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
        {props.data.map((el) => {
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
        <Button type="primary" size="medium" onClick={toggleModal}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes).isRequired,
};

export default BurgerConstructor;
