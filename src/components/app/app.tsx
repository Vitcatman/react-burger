import { useState, useEffect, useReducer } from "react";
import style from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchIngredients,
  ingredientsSelector,
} from "../../services/slices/ingredients-slice";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch();
  const { isLoading, hasError } = useSelector(ingredientsSelector);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  return (
    <>
      <AppHeader />
      {!isLoading && !hasError && (
        <main className={style.main}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main>
      )}
    </>
  );
}

export default App;
