import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";
import PropTypes from "prop-types";

const Ingredient = (props) => {
  return (
    <div className={`${styles.ingredient} mb-8`}>
      <img className={" mr-4 ml-4"} src={props.image} alt={props.name} />
      <div className={`${styles.price} mt-1 mb-1`}>
        <p className="text text_type_digits-default mt-1 pr-2">{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <h3 className={`${styles.title} text text_type_main-default mt-1`}>
        {props.name}
      </h3>
      <Counter count={props.__v} size="default" />
    </div>
  );
};

Ingredient.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  __v: PropTypes.number.isRequired,
};

export default Ingredient;
