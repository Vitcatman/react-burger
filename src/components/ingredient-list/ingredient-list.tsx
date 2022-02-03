import React from "react";
import Ingredient from "../ingredient/ingredient";
import styles from "./ingredient-list.module.css";

const IngredientList = (props) => {
  return (
    <section>
      <h2 className="text text_type_main-medium mb-6 mt-10">{props.name}</h2>
      <ul className={styles.ingredients + " ml-4 mr-2"}>
        {props.data.map((el) => {
          if (el.type === props.type) {
            return (
              <li key={el._id}>
                <Ingredient {...el} />
              </li>
            );
          } else {
            return null;
          }
        })}
      </ul>
    </section>
  );
};

export default IngredientList;
