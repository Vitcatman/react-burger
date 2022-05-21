import styles from "./order-page.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { wsUrl } from "../../utils/data";
import { FeedDetails } from "../../components/feed-details/feed-details";
import { wsClose, wsStart } from "../../services/slices/websocket-slice";
import { websocketSelector } from "../../services/slices/websocket-slice";

export const OrderPage = () => {
  const { feed } = useSelector(websocketSelector);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [activeOrder, setActiveOrder] = useState([]);

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
