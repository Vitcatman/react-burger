import styles from "./profile-orders.module.css";
import { FeedList } from "../../feed-list/feed-list";

import { wsUrl } from "../../../utils/data";
import { wsClose, wsStart } from "../../../services/slices/websocket-slice";
import { useEffect, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCookie } from "../../../utils/cookies";
import { Loader } from "../../../components/loader/loader";
import { ingredientsSelector } from "../../../services/slices/ingredients-slice";
import { TFeed } from "../../../utils/types";

type TProfileOrders = {
  feed: TFeed[];
};

export const ProfileOrders: FC<TProfileOrders> = ({ feed }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(ingredientsSelector);
  const profileToken = getCookie("accessToken").slice(7);

  useEffect(() => {
    dispatch(wsStart({ url: `${wsUrl}`, token: profileToken }));
    return () => {
      dispatch(wsClose());
    };
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <section className={`${styles.feed} custom-scroll `}>
          <FeedList feed={feed} />
        </section>
      )}
    </>
  );
};
