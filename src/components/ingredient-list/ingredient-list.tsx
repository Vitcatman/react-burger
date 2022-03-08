import { useState, useContext } from "react";
import Ingredient from "../ingredient/ingredient";
import styles from "./ingredient-list.module.css";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import PropTypes from "prop-types";
import ingredientPropTypes from "../../utils/proptypes";
import {IngredientsContext} from '../../services/ingredients-context';

const IngredientList = (props) => {
  const [active, setActive] = useState(null);
  const toggleModal = () => setActive(null);
  const { state } = useContext(IngredientsContext);

  return (
    <section>
      {active && (
        <Modal close={toggleModal}>
          <IngredientDetails {...active} />
        </Modal>
      )}
      <h2 className="text text_type_main-medium mb-5 mt-10" ref={props.tabRef}>
        {props.name}{" "}
      </h2>
      <ul className={`${styles.ingredients} ml-4 mr-2`}>
        {state.ingredients.map((el) => {
          if (el.type === props.type) {
            return (
              <li
                key={el._id}
                onClick={() => {
                  setActive(el);
                }}
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
