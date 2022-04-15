import styles from "./feed-item.module.css";
import { useSelector } from "react-redux";
import { ingredientsSelector } from "../../services/slices/ingredients-slice";
import { FeedIngredient } from "../feed-ingredient/feed-ingredient";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const FeedItem = () => {
  return (
    <div className={`${styles.wrapper} mt-4 mr-2`}>
      <div className={`${styles.info} mt-6 ml-6 mr-6`}>
        <span className="text_type_digits-default">#034535</span>
        <time className="text text_color_inactive text_type_main-default">
          Сегодня, 16:20 i-GMT+3
        </time>
      </div>
      <h2 className={`${styles.title}`}>Death Starship Main бургер</h2>
      <div className={`${styles.container} mb-6 ml-6 mr-6`}>
        <div className={`${styles.list}`}>
          <FeedIngredient />
          <FeedIngredient />
          <FeedIngredient />
        </div>
        <p className={`${styles.price}`}>
        <span className="text text_type_digits-default text_color_primary mr-2">
        510
        </span>
        <CurrencyIcon type="primary" />
        </p>
      </div>

      
    </div>
  );
};
