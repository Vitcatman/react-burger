import styles from "./feed-details.module.css";
import { useParams } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { ingredientsSelector } from "../../services/slices/ingredients-slice";
import { useEffect, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { formatDate } from "../../utils/data";
import { websocketSelector } from "../../services/slices/websocket-slice";
import { checkOrderStatus } from "../../utils/orderStatus";
import { TIngredient, TFeed } from "../../utils/types";

export const FeedDetails = () => {
  const { ingredients } = useSelector(ingredientsSelector);
  const { feed } = useSelector(websocketSelector);
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<TFeed | null>(null);
  const [orderPrice, setPrice] = useState<number>(0);
  const [orderIngredients, setIngredients] = useState<TIngredient[]>([]);

  useEffect(() => {
    const activeOrder: TFeed = feed.find((item) => item._id === id);
    if (!data && ingredients && activeOrder) {
      setData(activeOrder);
      let ingredientsArray: TIngredient[] = [];

      activeOrder.ingredients.forEach((element) => {
        let ingr = ingredients.find(
          (item: TIngredient) => item._id === element
        );
        if (ingr) {
          ingredientsArray.push({ ...ingr, count: 1 });
        }
        const price = ingredientsArray.reduce(
          (total, curValue) => total + curValue.price,
          0
        );
        setPrice(price);
      });
      let ingredientsCounted: TIngredient[] = [];
      ingredientsArray.forEach((element) => {
        const ingr = ingredientsCounted.find((i) => i._id === element._id);
        if (ingr) {
          if (ingr.count) ingr.count += 1;
        } else {
          ingredientsCounted.push(element);
        }
      });

      setIngredients(ingredientsCounted);
    }
  }, [ingredients, feed]);

  return (
    <>
      {data && (
        <div className={`${styles.container}`}>
          <span
            className={`${styles.number} text text_type_digits-default mb-10 `}
          >
            #{data.number}
          </span>
          <span className={`${styles.name}text text_type_main-medium mb-3`}>
            {data.name}
          </span>
          <span
            className={`text text_type_main-default mb-15 ${
              data.status === "done" ? styles.done : "text_color_primary"
            }`}
          >
            {checkOrderStatus(data.status)}
          </span>
          <span className={"text text_type_main-medium mb-6"}>Состав:</span>
          <ul className={`${styles.wrapper} mb-10 pr-6 custom-scroll`}>
            {orderIngredients &&
              orderIngredients.map((el) => (
                <li key={nanoid()} className={styles.ingredient}>
                  <div className={styles.wrap}>
                    <img
                      className={`${styles.icon} mr-4`}
                      src={el.image_mobile}
                      alt={el.name}
                    />
                    <span className={`text text_type_main-default`}>
                      {el.name}
                    </span>
                  </div>
                  <div className={styles.wrap}>
                    <span className={"text text_type_digits-default"}>
                      {el.count}
                    </span>
                    <span className={"text text_type_main-default mr-2 ml-2"}>
                      x
                    </span>
                    <span className={"text text_type_digits-default mr-2"}>
                      {el.price}
                    </span>
                    <CurrencyIcon type="primary" />
                  </div>
                </li>
              ))}
          </ul>
          <div className={styles.info}>
            <span className={"text text_type_main-default text_color_inactive"}>
              {formatDate(data.createdAt)}
            </span>
            <div className={styles.wrap}>
              <span className={"text text_type_digits-default mr-2"}>
                {orderPrice}
              </span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
