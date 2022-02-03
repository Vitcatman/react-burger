import React, { useState, useRef } from 'react'
import styles from './burger-ingredients.module.css'
import { Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import data from '../../utils/data'
import IngredientList from '../ingredient-list/ingredient-list'


const BurgerIngredients = () => {   
const [current, setCurrent] = useState('Булки')
const clickOnTab = (evt) => {
      setCurrent(evt);
};

  return (
    <section className={styles.container + ' mr-10'}>
      <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
      <div style={{ display: 'flex' }} className='mb-10'>
      <Tab value="Булки" active={current === 'Булки'} onClick={evt => clickOnTab(evt)}>
        Булки
      </Tab>
      <Tab value="Соусы" active={current === 'Соусы'} onClick={evt => clickOnTab(evt)}>
        Соусы
      </Tab>
      <Tab value="Начинки" active={current === 'Начинки'} onClick={evt => clickOnTab(evt)}>
        Начинки
      </Tab>
    </div>
     <div className={`${styles.scroll} custom-scroll`}>
        <IngredientList  data={data} name='Булки' type='bun'/>         
        <IngredientList  data={data} name='Соусы' type='main'/>
        <IngredientList  data={data} name='Начинки' type='sauce'/>
      </div>
      
    </section>
  );  
}

export default BurgerIngredients;