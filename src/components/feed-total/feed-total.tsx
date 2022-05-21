import styles from "./feed-total.module.css";
import { useSelector } from "react-redux";
import { websocketSelector } from "../../services/slices/websocket-slice";
import { nanoid } from "@reduxjs/toolkit";
import PropTypes from "prop-types";

export const FeedTotal = ({ feed }) => {
  const { total, totalToday } = useSelector(websocketSelector);

  const done = feed.filter((el) => el.status === "done");
  const inProcess = feed.filter((el) => el.status === "pending");

  return (
    <>
      <div className={`${styles.wrapper} ml-15`}>
        <div className={`${styles.container} mb-15`}>
          <div className={`${styles.status} mr-9`}>
            <h2 className={`text text_type_main-medium mb-6`}>Готовы:</h2>
            <ul className={`${styles.list} custom-scroll`}>
              {feed &&
                done.map((item) => (
                  <li
                    key={nanoid()}
                    className={`${styles.done} text text_type_digits-default`}
                  >
                    {item.number}
                  </li>
                ))}
            </ul>
          </div>
          <div className={styles.status}>
            <h2 className={`text text_type_main-medium mb-6`}>В работе:</h2>
            <ul className={`${styles.list}`}>
              {feed &&
                inProcess.map((item) => (
                  <li
                    key={nanoid()}
                    className={`text text_type_digits-default`}
                  >
                    {item.number}
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <p className={`text text_type_main-medium`}>Выполнено за все время:</p>
        <p className={`text text_type_digits-large mb-15 ${styles.highlight}`}>
          {total}
        </p>
        <p className={`text text_type_main-medium`}>Выполнено за сегодня:</p>
        <p className={`text text_type_digits-large ${styles.highlight}`}>
          {totalToday}
        </p>
      </div>
    </>
  );
};
FeedTotal.propTypes = {
  feed: PropTypes.array.isRequired,
};
