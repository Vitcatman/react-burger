import styles from "./order-feed.module.css";
import { FeedList } from "../../components/feed-list/feed-list";
import { FeedTotal } from "../../components/feed-total/feed-total";
import { wsUrl } from "../../utils/data";
import { wsClose, wsStart } from "../../services/slices/websocket-slice";
import { useEffect } from "react";
import { Loader } from "../../components/loader/loader";
import { useAppSelector, useAppDispatch } from "../../services";

export const OrderFeed = () => {
  const { feed } = useAppSelector((state) => state.webSocket);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(wsStart({ url: `${wsUrl}/all` }));
    return () => {
      dispatch(wsClose());
    };
  }, []);

  return (
    <>
      {feed.length === 0 && <Loader />}
      {feed.length > 0 && (
        <main className={styles.main}>
          <h1 className={`${styles.title} text text_type_main-large `}>
            Лента Заказов
          </h1>
          <div className={styles.container}>
            <FeedList feed={feed} />
            <FeedTotal feed={feed} />
          </div>
        </main>
      )}
    </>
  );
};
