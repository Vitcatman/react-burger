import styles from "./profile-orders.module.css";
import { FeedList } from "../../feed-list/feed-list";

import { wsUrl } from "../../../utils/data";
import { wsClose, wsStart } from "../../../services/slices/websocket-slice";
import { useEffect, FC } from "react";
import { getCookie } from "../../../utils/cookies";
import { Loader } from "../../../components/loader/loader";
import { TFeed } from "../../../utils/types";
import { useAppSelector, useAppDispatch } from "../../../services";

type TProfileOrders = {
  feed: TFeed[];
};

export const ProfileOrders: FC<TProfileOrders> = ({ feed }) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.ingredients);
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
