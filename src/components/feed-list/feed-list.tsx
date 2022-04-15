import styles from "./feed-list.module.css";
import { useSelector } from "react-redux";
import { ingredientsSelector } from "../../services/slices/ingredients-slice";
import {FeedItem} from "../feed-item/feed-item"

export const FeedList = () => {

  return (
    
      
        <section className={`${styles.list} custom-scroll`}>
        
             <FeedItem />
             <FeedItem />
             <FeedItem />
             <FeedItem />
             <FeedItem />
             <FeedItem />
             <FeedItem />
            
          
        </section>
     
    
  );
};