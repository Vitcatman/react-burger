import styles from "./profile.module.css";
import { Switch, Route } from "react-router-dom";
import { ProfileNavigation } from "../../components/profile/profile-navigation/profile-navigation";
import { EditForm } from "../../components/profile/profile-form/profile-form";
import { ProfileOrders } from "../../components/profile/profile-orders/profile-orders";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { websocketSelector } from "../../services/slices/websocket-slice";
import { Loader } from "../../components/loader/loader";

export const Profile = () => {
  const { feed } = useSelector(websocketSelector);

  let reversedFeed = [];

  if (feed.length > 0) {
    reversedFeed = [...feed].reverse();
  }

  return (
    <>
      <div className={styles.main}>
        <ProfileNavigation />
        <Switch>
          <Route path="/profile" exact={true}>
            <EditForm />
          </Route>
          <Route path="/profile/orders" exact={true}>
            {reversedFeed === [] && <Loader />}
            <ProfileOrders feed={reversedFeed} />
          </Route>
        </Switch>
      </div>
    </>
  );
};
