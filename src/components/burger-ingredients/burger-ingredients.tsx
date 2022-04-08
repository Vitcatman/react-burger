import { useState, useRef} from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientList from "../ingredient-list/ingredient-list";

const BurgerIngredients = () => {
  const [current, setCurrent] = useState("Булки");
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  const scrollRef = useRef(null);
  const clickOnTab = (evt, ref) => {
    setCurrent(evt);
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = () => {
    const scrollPosition = scrollRef.current.getBoundingClientRect().top

    const bunPosition = Math.abs(scrollPosition - bunRef.current.getBoundingClientRect().top)
    const saucePosition = Math.abs(scrollPosition - sauceRef.current.getBoundingClientRect().top)
    const mainPosition = Math.abs(scrollPosition - mainRef.current.getBoundingClientRect().top)

    if (bunPosition < saucePosition) {
       setCurrent('Булки')
    } else if (saucePosition < mainPosition) {
       setCurrent('Соусы')
    } else {
       setCurrent('Начинки')
    }
 }

  return (
    <section className={styles.container + " mr-10"}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={`${styles.tabs}`}>
        <Tab
          value="bun"
          active={current === "Булки"}
          onClick={(evt) => clickOnTab(evt, bunRef)}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === "Соусы"}
          onClick={(evt) => clickOnTab(evt, sauceRef)}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === "Начинки"}
          onClick={(evt) => clickOnTab(evt, mainRef)}
        >
          Начинки
        </Tab>
      </div>
      <div ref={scrollRef} onScroll={handleScroll} className={`${styles.scroll} custom-scroll`}>
        <IngredientList
          name="Булки"
          type="bun"
          tabRef={bunRef}
        />
        <IngredientList
          name="Соусы"
          type="sauce"
          tabRef={sauceRef}
        />
        <IngredientList
          name="Начинки"
          type="main"
          tabRef={mainRef}
        />
      </div>
    </section>
  );
};

export default BurgerIngredients;
