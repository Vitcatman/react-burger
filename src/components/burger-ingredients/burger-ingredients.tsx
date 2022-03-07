import { useState, useRef, useContext } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientList from "../ingredient-list/ingredient-list";
import { IngredientsContext } from "../../services/ingredients-context";

const BurgerIngredients = () => {
  const { state } = useContext(IngredientsContext);
  const [current, setCurrent] = useState("Булки");
  const bunRef = useRef();
  const sauceRef = useRef();
  const mainRef = useRef();
  const clickOnTab = (evt, ref) => {
    setCurrent(evt);
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={styles.container + " mr-10"}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={`${styles.tabs}`}>
        <Tab
          value="Булки"
          active={current === "Булки"}
          onClick={(evt) => clickOnTab(evt, bunRef)}
        >
          Булки
        </Tab>
        <Tab
          value="Соусы"
          active={current === "Соусы"}
          onClick={(evt) => clickOnTab(evt, sauceRef)}
        >
          Соусы
        </Tab>
        <Tab
          value="Начинки"
          active={current === "Начинки"}
          onClick={(evt) => clickOnTab(evt, mainRef)}
        >
          Начинки
        </Tab>
      </div>
      <div className={`${styles.scroll} custom-scroll`}>
        <IngredientList
          data={state.ingredients}
          name="Булки"
          type="bun"
          tabRef={bunRef}
        />
        <IngredientList
          data={state.ingredients}
          name="Соусы"
          type="sauce"
          tabRef={sauceRef}
        />
        <IngredientList
          data={state.ingredients}
          name="Начинки"
          type="main"
          tabRef={mainRef}
        />
      </div>
    </section>
  );
};

export default BurgerIngredients;
