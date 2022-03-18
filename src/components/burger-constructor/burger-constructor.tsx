import { useMemo } from "react";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

import {
  ingredientsSelector,
  addIngredient,
  fetchOrder,
  closeOrderModal,
  removeIngredient,
} from "../../services/slices/ingredients-slice";
import { useDispatch, useSelector } from "react-redux";
import ConstructorItem from "../constructor-item/constructor-item";
import { useDrop } from "react-dnd";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { ingredientsConstructor, cartModalState } =
    useSelector(ingredientsSelector);

  const ingr = ingredientsConstructor.filter((item) => item.type !== "bun");
  const bun = ingredientsConstructor.find((item) => item.type === "bun");

  const finalPrice = useMemo(() => {
    if (bun && ingredientsConstructor.length >= 1)
      return ingr.reduce(
        (total, curValue) => total + curValue.price,
        bun.price * 2
      );
  }, [ingredientsConstructor]);

  const [{ isOver }, dropTarget] = useDrop({
    accept: "ingredient",
    drop: (item: { type: string; _id: string }) => {
      if (item.type === "bun") {
        dispatch(removeIngredient(item));
        dispatch(addIngredient(item));
      } else {
        dispatch(addIngredient(item));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <section
      ref={dropTarget}
      className={`${styles.container} mt-25`}
      style={{ outline: isOver ? "2px solid #4C4CFF" : "none" }}
    >
      {ingredientsConstructor.length === 0 && (
        <span className="text text_type_main-medium">
          Перетащите сюда ингредиенты
        </span>
      )}

      {cartModalState && (
        <Modal
          close={() => {
            // @ts-ignore
            dispatch(closeOrderModal());
          }}
        >
          <OrderDetails />
        </Modal>
      )}

      {bun && (
        <div className={`ml-7 pl-5`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name + " (верх)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}

      <ul className={`${styles.cart} custom-scroll`}>
        {ingr.length !== 0 &&
          ingr.map((item, index) => (
            // @ts-ignore
            <ConstructorItem item={item} index={index} key={item.id} />
          ))}
      </ul>

      {bun && (
        <div className={`ml-7 pl-5`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name + " (низ)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}

      {ingredientsConstructor.length >= 1 && (
        <div className={`${styles.total} mr-4 mt-10`}>
          <div className={`mr-10`}>
            <span className={"text text_type_digits-medium mr-2"}>
              {finalPrice}
            </span>
            <CurrencyIcon type="primary" />
          </div>
          {/* @ts-ignore */}
          <Button
            type="primary"
            size="medium"
            // @ts-ignore
            onClick={() => dispatch(fetchOrder(ingredientsConstructor))}
          >
            Оформить заказ
          </Button>
        </div>
      )}
    </section>
  );
};

export default BurgerConstructor;
