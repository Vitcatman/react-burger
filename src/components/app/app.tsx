import { useState, useEffect, useReducer } from "react";
import style from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {IngredientsContext} from '../../services/ingredients-context';


const ingredientsApi = "https://norma.nomoreparties.space/api/ingredients";

const initialState = {
  ingredients: [],
  isLoading: true,
  hasError: false
}

const reducer = (state, action) => {

  switch (action.type) {
    case 'ingredients':
      return {...state, ingredients: action.payload}

    default:
      return {state};
  }
}

function App() {
  const [state, dispatcher] = useReducer(reducer, initialState);

  const [hasError, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    const getIngredients = async () => {
      try {
        const res = await fetch(ingredientsApi);
        if (!res.ok) {
          throw new Error("Ошибка загрузки");
        }
        const newData = await res.json();
        dispatcher({type:'ingredients', payload: newData.data})
        setIsLoading(false);
      } catch (error) {
        setError(true);
        dispatcher({type:'ingredients', payload: []})
        console.log(error);
      }
    };
    getIngredients();
  }, []);

  return (
    <>
      <AppHeader />
      {!isLoading && !hasError && (
        <main className={style.main}>
            <IngredientsContext.Provider value={{state}}>
              <BurgerIngredients/>
              <BurgerConstructor/>
            </IngredientsContext.Provider>
        </main>
      )}
    </>
  );
}

export default App;
