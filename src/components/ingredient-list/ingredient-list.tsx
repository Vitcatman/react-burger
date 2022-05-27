import Ingredient from "../ingredient/ingredient";
import styles from "./ingredient-list.module.css";
import { showIngredientModal} from '../../services/slices/ingredients-slice';
import { FC, MutableRefObject } from 'react';
import { useAppSelector, useAppDispatch } from "../../services";

type IIngredientList = {
  tabRef: MutableRefObject<HTMLDivElement>,
  name: string,
  type: string
}

const IngredientList: FC<IIngredientList> = ({tabRef, name, type}) => {
  const dispatch = useAppDispatch();
  const { ingredients } = useAppSelector((state) => state.ingredients);

  return (
    <section>
      <h2 className="text text_type_main-medium mb-5 mt-10" ref={tabRef}>
        {name}{" "}
      </h2>
      <ul className={`${styles.ingredients} ml-4 mr-2`}>
        {ingredients.map((el) => {
          if (el.type === type) {
            return (
              <li
                key={el._id}
                onClick={() => {dispatch(showIngredientModal(el))}}
              >
                <Ingredient item={el} />
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
