import React, { useState, useEffect} from "react";
import style from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
// import data from "../../utils/data";

const ingredientsApi = 'https://norma.nomoreparties.space/api/ingredients'

function App() {
 const [state, setState] = useState({
    isLoading: true,
    hasError: false,
    data: []
  }) 

  const { data, isLoading, hasError } = state;
  
 useEffect(() => {
    const getIngredients = async () => {
      try {
      const res = await fetch(ingredientsApi);
      if (!res.ok) {
        throw new Error('Ошибка загрузки');
      }
      const newData = await res.json();
      setState({...state, data: newData.data, isLoading: false });
      
    } 
      catch(error) {
        setState({...state, data: [], hasError: true });
        console.log(error)
      }

    }

    getIngredients();
  }, [])



  return (
          <>
          <AppHeader />
          
          {!isLoading && !hasError &&          
           <main className={style.main}>
            <BurgerIngredients data={state.data} />
            <BurgerConstructor data={state.data} />
          </main>}

          </>  

  );
}

export default App;
