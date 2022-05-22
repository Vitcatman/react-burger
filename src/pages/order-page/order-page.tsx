import styles from "./order-page.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState, FC } from "react";
import { wsUrl } from "../../utils/data";
import { FeedDetails } from "../../components/feed-details/feed-details";
import { wsClose, wsStart } from "../../services/slices/websocket-slice";
import { TFeed } from "../../utils/types";
import { useAppSelector, useAppDispatch } from "../../services";

export const OrderPage: FC = () => {
  const { feed } = useAppSelector((state) => state.webSocket);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const [activeOrder, setActiveOrder] = useState<[] | TFeed>([]);

  useEffect(() => {
    if (feed.length === 0) {
      dispatch(wsStart({ url: `${wsUrl}/all` }));
      return () => {
        dispatch(wsClose());
      };
    }
    const currentOrder = feed.find((el) => el._id === id);
    if (currentOrder) setActiveOrder(currentOrder);
  }, [feed]);

  return (
    <div className={styles.wrapper}>
      {feed.length > 0 && activeOrder && <FeedDetails />}
    </div>
  );
};
