import styles from "./feed-list.module.css";
import { FeedItem } from "../feed-item/feed-item";
import { FC } from "react";
import { TFeed } from "../../utils/types";

type TFeedList = {
  feed: TFeed[];
};

export const FeedList: FC<TFeedList> = ({ feed }) => {
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
