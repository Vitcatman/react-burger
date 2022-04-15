import styles from "./profile-orders.module.css";
import {FeedList} from "../../feed-list/feed-list"

export const ProfileOrders = () => {
  return (
    <span className=" text text_type_main-small text_color_inactive mt-20">
      <FeedList/>
    </span>
  );
};
