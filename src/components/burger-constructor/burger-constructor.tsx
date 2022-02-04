import React from "react";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ingredientPropTypes from "../../utils/proptypes";

const BurgerItem = (props) => {
  return (
    <ConstructorElement
      text={props.name}
      price={props.price}
      thumbnail={props.image}
    />
  );
};

const BurgerConstructor = (props) => {
  const finalPrice = props.data.reduce(
    (total, curValue) => total + curValue.price,
    0
  );
  const bun = props.data.filter((item) => item.type === "bun");

  return (
    <section className={`${styles.container} mt-25`}>
      <div className={`ml-7 pl-5`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={bun[0].price}
          thumbnail={bun[0].image}
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
                <BurgerItem {...el} />
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
          text="Краторная булка N-200i (низ)"
          price={bun[0].price}
          thumbnail={bun[0].image}
        />
      </div>

      <div className={`${styles.total} mr-4 mt-10`}>
        <div className={`mr-10`}>
          <span className={"text text_type_digits-medium mr-2"}>
            {finalPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>

        <Button type="primary" size="medium">
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
