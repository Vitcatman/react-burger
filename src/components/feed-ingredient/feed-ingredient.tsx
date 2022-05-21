import styles from "./feed-ingredient.module.css";
import PropTypes from "prop-types";
import { TIngredient } from "../../utils/types";
import { FC } from "react";

type TFeedIngredient = {
  data: TIngredient
}

export const FeedIngredient: FC<TFeedIngredient>  = ({ data }) => {
  return (
    <img src={data.image_mobile} alt={data.name} className={styles.image} />
  );
};
