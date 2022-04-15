import styles from "./order-feed.module.css";
import {FeedList} from "../../components/feed-list/feed-list";
import {FeedTotal} from "../../components/feed-total/feed-total";
import { useSelector } from "react-redux";
import { ingredientsSelector } from "../../services/slices/ingredients-slice";


export const OrderFeed = () => {

  return (
    <>
      
        <main className={styles.main}>
        <h1 className={`${styles.title} text text_type_main-large `}>Лента Заказов</h1>
          <div className={styles.container}>
            <FeedList />
            <FeedTotal />
            </div>
        </main>
     
    </>
  );
};
