import { useMemo, FC } from "react";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {
  addIngredient,
  fetchOrder,
  closeOrderModal,
  removeIngredient,
} from "../../services/slices/ingredients-slice";
import ConstructorItem from "../constructor-item/constructor-item";
import { useDrop } from "react-dnd";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/index";

const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { ingredientsConstructor, cartModalState, orderName } =
    useAppSelector((state) => state.ingredients);
  const { isAuthorized } = useAppSelector((state) => state.authorization);

  const ingr = useMemo(
    () => ingredientsConstructor.filter((item) => item.type !== "bun"),
    [ingredientsConstructor]
  );

  const bun = useMemo(
    () => ingredientsConstructor.find((item) => item.type === "bun"),
    [ingredientsConstructor]
  );

  const sendOrder = () => {
    if (isAuthorized === false) {
      history.replace({ pathname: "/login" });
    } else {
      const constrBuns = ingredientsConstructor.filter(
        (el) => el.type === "bun"
      );
      const order = ingredientsConstructor.concat(constrBuns);
      dispatch(fetchOrder(order));
    }
  };

  const finalPrice = useMemo<number>(() => {
    if (bun && ingredientsConstructor.length >= 1)
      return ingr.reduce(
        (total: number, curValue: any) => total + curValue.price,
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
          Перетащите сюда ингредиенты. Начните с выбора булки
        </span>
      )}

      {cartModalState && (
        <Modal
          close={() => {
            dispatch(closeOrderModal());
          }}
          title={orderName}
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

      {ingredientsConstructor.length >= 1 && bun && (
        <div className={`${styles.total} mr-4 mt-10`}>
          <div className={`mr-10`}>
            <span className={"text text_type_digits-medium mr-2"}>
              {finalPrice}
            </span>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            type="primary"
            size="medium"
            onClick={() => {
              sendOrder();
            }}
          >
            Оформить заказ
          </Button>
        </div>
      )}
    </section>
  );
};

export default BurgerConstructor;
