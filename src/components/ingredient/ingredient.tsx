import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredient.module.css'

const Ingredient = (props) => {
    return <div className={styles.ingredient + ' mb-8'}>
          <img className={' mr-4 ml-4'} src={props.image} alt={props.name} />
          <div className={styles.price + ' mt-1 mb-1'}>
            <p className="text text_type_digits-default pr-2">{props.price}</p>
            <CurrencyIcon type="primary" />
          </div>
          <h3 className={styles.title + " text text_type_main-default"}>{props.name}</h3>
        </div>
  }

  export default Ingredient;