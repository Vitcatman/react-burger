import style from "./home.module.css";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Loader } from "../../components/loader/loader";
import { useAppSelector } from "../../services";

export const HomePage = () => {
  const { isLoading, hasError } = useAppSelector((state) => state.ingredients);

  return (
    <>
      {isLoading && <Loader />}
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
};
