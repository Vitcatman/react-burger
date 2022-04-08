import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { ingredientsSelector } from "../../services/slices/ingredients-slice";
import { Link, useLocation } from 'react-router-dom'
import PropTypes from "prop-types";
import ingredients from "../../utils/proptypes";

const Ingredient = (item) => {
  const [, dragRef] = useDrag({
    type: "ingredient",
    item,
  });
  const location = useLocation()

  const { ingredientsConstructor } = useSelector(ingredientsSelector);

  const counter = ingredientsConstructor.filter(
    (i) => i._id === item._id
  ).length;

  return (
    <Link ref={dragRef} to={{ pathname: `/ingredients/${item._id}`, state: { background: location } }}>
    <div className={`${styles.ingredient} mb-8`} ref={dragRef}>
      <img className={" mr-4 ml-4"} src={item.image} alt={item.name} />
      <div className={`${styles.price} mt-1 mb-1`}>
        <p className="text text_type_digits-default mt-1 pr-2">{item.price}</p>
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

Ingredient.propTypes = ingredients.isRequired;

export default Ingredient;
