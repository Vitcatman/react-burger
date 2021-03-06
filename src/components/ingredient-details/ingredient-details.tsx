import styles from "./ingredient-details.module.css";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../services";

const IngredientDetails = () => {
  const { ingredients } = useAppSelector((state) => state.ingredients);
  const { id } = useParams<{id:string}>();
  const currentIngredient = ingredients.find((item) => item._id === id);

  return (
    <>
      {currentIngredient && (
        <div>
          <h2
            className={`${styles.title} mt-10 ml-10 text text_type_main-large`}
          >
            Детали ингредиента
          </h2>
          <img
            className={styles.image}
            alt={currentIngredient.name}
            src={currentIngredient.image_large}
          />
          <h3 className={`mt-4 text text_type_main-medium`}>
            {currentIngredient.name}
          </h3>
          <ul className={`${styles.info} mt-8 mb-15`}>
            <li
              className={`${styles.info_item} text text_type_main-default text_color_inactive`}
            >
              Калории,ккал
              <span
                className={`${styles.count} mt-2 text text_type_digits-default text_color_inactive`}
              >
                {currentIngredient.calories}
              </span>
            </li>
            <li
              className={`${styles.info_item} text text_type_main-default text_color_inactive`}
            >
              Белки, г
              <span
                className={`${styles.count} mt-2 text text_type_digits-default text_color_inactive`}
              >
                {currentIngredient.proteins}
              </span>
            </li>
            <li
              className={`${styles.info_item} text text_type_main-default text_color_inactive`}
            >
              Жиры, г
              <span
                className={`${styles.count} mt-2 text text_type_digits-default text_color_inactive`}
              >
                {currentIngredient.fat}
              </span>
            </li>
            <li
              className={`${styles.info_item} text text_type_main-default text_color_inactive`}
            >
              Углеводы, г
              <span
                className={`${styles.count} mt-2 text text_type_digits-default text_color_inactive`}
              >
                {currentIngredient.carbohydrates}
              </span>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default IngredientDetails;
