import styles from "./ingredient-details.module.css";
import PropTypes from "prop-types";

const IngredientDetails = (props) => {
  return (
    <>
      <h2 className={`${styles.title} mt-10 ml-10 text text_type_main-large`}>
        Детали Ингредиента
      </h2>
      <img
        className={styles.image}
        alt={props.name}
        src={props.image_large}
      ></img>
      <h3 className={`mt-4 text text_type_main-medium`}>{props.name}</h3>
      <ul className={`${styles.info} mt-8`}>
        <li
          className={`${styles.info_item} text text_type_main-default text_color_inactive`}
        >
          Калории,ккал
          <span
            className={`${styles.count} mt-2 text text_type_digits-default text_color_inactive`}
          >
            {props.calories}
          </span>
        </li>
        <li
          className={`${styles.info_item} text text_type_main-default text_color_inactive`}
        >
          Белки, г
          <span
            className={`${styles.count} mt-2 text text_type_digits-default text_color_inactive`}
          >
            {props.proteins}
          </span>
        </li>
        <li
          className={`${styles.info_item} text text_type_main-default text_color_inactive`}
        >
          Жиры, г
          <span
            className={`${styles.count} mt-2 text text_type_digits-default text_color_inactive`}
          >
            {props.fat}
          </span>
        </li>
        <li
          className={`${styles.info_item} text text_type_main-default text_color_inactive`}
        >
          Углеводы, г
          <span
            className={`${styles.count} mt-2 text text_type_digits-default text_color_inactive`}
          >
            {props.carbohydrates}
          </span>
        </li>
      </ul>
    </>
  );
};

IngredientDetails.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired
  }),
}

export default IngredientDetails;
