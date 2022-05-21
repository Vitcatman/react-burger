import styles from "./feed-item.module.css";
import { useSelector } from "react-redux";
import { ingredientsSelector } from "../../services/slices/ingredients-slice";
import { FeedIngredient } from "../feed-ingredient/feed-ingredient";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { formatDate } from "../../utils/data";
import { Link, useLocation } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { checkOrderStatus } from "../../utils/orderStatus";
import { TFeed, TIngredient } from "../../utils/types";
import { FC } from "react";

type TFeedItem = {
  data: TFeed;
};



export const FeedItem: FC<TFeedItem> = ({ data }) => {
  const { ingredients } = useSelector(ingredientsSelector);
  const location = useLocation();
  let feedIngredients: TIngredient[] = [];
  
  data.ingredients.forEach((item) => {
    if (item !== null)
      feedIngredients.push(ingredients.find((el) => el._id === item));
  });

  const orderPrice = feedIngredients.reduce(
    (total, curValue) => total + curValue.price,
    0
  );

  return (
    <Link
      className={`${styles.wrapper} mt-4 mr-2`}
      to={{ pathname: `/feed/${data._id}`, state: { background: location } }}
    >
      <div className={`${styles.info} mt-6 ml-6 mr-6`}>
        <span className="text_type_digits-default">#{data.number}</span>
        <time className="text text_color_inactive text_type_main-default">
          {formatDate(data.createdAt)}
        </time>
      </div>
      <h2 className={`${styles.title}`}>{data.name}</h2>
      {location.pathname.startsWith("/profile") && (
        <span
          className={`text text_type_main-small ml-6 ${
            data.status === "done" ? styles.done : "text_color_primary"
          }`}
        >
          {checkOrderStatus(data.status)}
        </span>
      )}
      <div className={`${styles.container} mb-6 ml-6 mr-6`}>
        <ul className={`${styles.list}`}>
          {feedIngredients.slice(0, 6).map((i, index) => {
            if (index < 5) {
              return (
                <li className={styles.element} key={nanoid()}>
                  <FeedIngredient data={i} />
                </li>
              );
            } else {
              return (
                <li className={styles.element} key={nanoid()}>
                  <FeedIngredient data={i} />
                  {feedIngredients.length !== 6 && (
                    <span
                      className={`${styles.cover} text_type_digits-default`}
                    >
                      +{feedIngredients.length - 6}
                    </span>
                  )}
                </li>
              );
            }
          })}
        </ul>
        <p className={`${styles.price}`}>
          <span className="text text_type_digits-default text_color_primary mr-2">
            {orderPrice}
          </span>
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </Link>
  );
};
