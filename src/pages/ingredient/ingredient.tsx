import { useParams } from "react-router-dom";
import AppHeader from "../../components/app-header/app-header";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import styles from "./ingredient.module.css";



export const Ingredient = () => {
  const ingredientId = useParams();

  return (
    <>
    
      <AppHeader />
       <IngredientDetails/>

    </>
  );
};
