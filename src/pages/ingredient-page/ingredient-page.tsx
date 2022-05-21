import { useParams } from "react-router-dom";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import { useMemo } from "react";
import styles from "./ingredient-page.module.css";
import { ingredientsSelector } from "../../services/slices/ingredients-slice";
import { Loader } from "../../components/loader/loader";
import { useAppSelector } from "../../services";

export const IngredientPage = () => {
  const { id } = useParams<{ id: string }>();
  const { ingredients, isLoading } = useAppSelector(ingredientsSelector);
  const currentIngredient = useMemo(
    () => ingredients.find((el) => el._id === id),
    [ingredients, id]
  );

  return (
    <>
      {isLoading && <Loader />}
      {currentIngredient && (
        <>
          <div className={styles.wrapper}>
            <IngredientDetails />
          </div>
        </>
      )}
    </>
  );
};
