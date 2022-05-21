import styles from "./feed-ingredient.module.css";
import PropTypes from "prop-types";

export const FeedIngredient = ({ data }) => {
  return (
    <img src={data.image_mobile} alt={data.name} className={styles.image} />
  );
};
FeedIngredient.propTypes = {
  data: PropTypes.object.isRequired,
};
