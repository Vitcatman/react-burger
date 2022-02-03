import React from 'react';
import style from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'

function App() {
  return (
    <>
      <AppHeader />
      <main className={style.main}>
      <BurgerIngredients />
      </main>
    </>
  );
}

export default App;