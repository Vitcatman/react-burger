import { useState, useContext } from "react";
import Ingredient from "../ingredient/ingredient";
import styles from "./ingredient-list.module.css";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import PropTypes from "prop-types";
import { ingredientsSelector, showIngredientModal, hideIngredientModal} from '../../services/slices/ingredients-slice';
import { useDispatch, useSelector } from 'react-redux'

const IngredientList = (props) => {
  const dispatch = useDispatch();
  const { ingredients, ingredientModalState, ingredientDetails } = useSelector(ingredientsSelector)


  return (
    <section>
      <h2 className="text text_type_main-medium mb-5 mt-10" ref={props.tabRef}>
        {props.name}{" "}
      </h2>
      <ul className={`${styles.ingredients} ml-4 mr-2`}>
        {ingredients.map((el) => {
          if (el.type === props.type) {
            return (
              <li
                key={el._id}
                onClick={() => {dispatch(showIngredientModal(el))}}
              >
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

IngredientList.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  tabRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

export default IngredientList;
