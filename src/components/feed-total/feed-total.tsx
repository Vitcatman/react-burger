import styles from "./feed-total.module.css";
import { useSelector } from "react-redux";
import { ingredientsSelector } from "../../services/slices/ingredients-slice";

export const FeedTotal = () => {

  return (
    <>
      
      <div className={`${styles.wrapper} ml-15`}>
          <div className={`${styles.container} mb-15`}>
            <div className={`${styles.status} mr-9`}>
              <h2 className={`text text_type_main-medium mb-6`}>Готовы:</h2>
              <ul className={`${styles.list} custom-scroll`}>
                <li className={`${styles.done} text text_type_digits-default`}>034533</li>
                <li className={`${styles.done} text text_type_digits-default`}>034538</li>
                <li className={`${styles.done} text text_type_digits-default`}>034556</li>
                <li className={`${styles.done} text text_type_digits-default`}>034533</li>
                <li className={`${styles.done} text text_type_digits-default`}>034538</li>
                <li className={`${styles.done} text text_type_digits-default`}>034556</li>
                <li className={`${styles.done} text text_type_digits-default`}>034533</li>
                <li className={`${styles.done} text text_type_digits-default`}>034538</li>
                <li className={`${styles.done} text text_type_digits-default`}>034556</li>
                <li className={`${styles.done} text text_type_digits-default`}>034533</li>
              </ul>
            </div>
            <div className={styles.status}>
              <h2 className={`text text_type_main-medium mb-6`}>В работе:</h2>
              <ul className={`${styles.list}`}>
                <li className={'text text_type_digits-default'}>233444</li>
                <li className={'text text_type_digits-default'}>233444</li>
                <li className={'text text_type_digits-default'}>233444</li>
              </ul>
            </div>
          </div>
          <p className={`text text_type_main-medium`}>Выполнено за все время:</p>
          <p className={`text text_type_digits-large mb-15 ${styles.highlight }`}>45325</p>
          <p className={`text text_type_main-medium`}>Выполнено за сегодня:</p>
          <p className={`text text_type_digits-large ${styles.highlight }`}>3421</p>
        </div>
     
    </>
  );
};