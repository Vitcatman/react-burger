import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { FC } from "react";
import { TIngredient } from "../../utils/types";
import { useAppSelector } from "../../services";

type TItem = {
  item: TIngredient;
};

const Ingredient: FC<TItem> = ({ item }) => {
  const [, dragRef] = useDrag({
    type: "ingredient",
    item,
  });
  const location = useLocation();

  const { ingredientsConstructor } = useAppSelector((state) => state.ingredients)

  const counter = ingredientsConstructor.filter(
    (i) => i._id === item._id
  ).length;

  return (
    <Link
      ref={dragRef}
      className={styles.link}
      to={{
        pathname: `/ingredients/${item._id}`,
        state: { background: location },
      }}
    >
      <div className={`${styles.ingredient} mb-8`} ref={dragRef}>
        <img className={" mr-4 ml-4"} src={item.image} alt={item.name} />
        <div className={`${styles.price} mt-1 mb-1`}>
          <p className="text text_type_digits-default mt-1 pr-2">
            {item.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <h3 className={`${styles.title} text text_type_main-default mt-1`}>
          {item.name}
        </h3>
        <Counter count={counter} size="default" />
      </div>
    </Link>
  );
};

export default Ingredient;
