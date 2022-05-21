import styles from "./feed-list.module.css";
import { FeedItem } from "../feed-item/feed-item";
import PropTypes from "prop-types";

export const FeedList = ({ feed }) => {
  return (
    <ul className={`${styles.list} custom-scroll`}>
      {feed.map((order) => (
        <li key={order._id}>
          <FeedItem data={order} />
        </li>
      ))}
    </ul>
  );
};
FeedList.propTypes = {
  feed: PropTypes.array.isRequired,
};
