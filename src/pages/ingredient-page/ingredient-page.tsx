import { useParams } from "react-router-dom";
import AppHeader from "../../components/app-header/app-header";
import { useSelector } from "react-redux";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import { useMemo } from "react";
import styles from "./ingredient-page.module.css";
import { ingredientsSelector } from "../../services/slices/ingredients-slice";

export const IngredientPage = () => {
  const { id } = useParams();
  console.log(id);
  const { ingredients } = useSelector(ingredientsSelector);
  const currentIngredient = useMemo(
    () => ingredients.find((el) => el._id === id),
    [ingredients, id]
  );

  return (
    <>
      {currentIngredient && (
        <>
          <AppHeader />
          <div className={styles.wrapper}>
            <IngredientDetails />
          </div>
        </>
      )}
    </>
  );
};
