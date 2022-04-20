import styles from "./profile.module.css";
import { Switch, Route } from "react-router-dom";
import { ProfileNavigation } from "../../components/profile/profile-navigation/profile-navigation";
import { EditForm } from "../../components/profile/profile-form/profile-form";
import { ProfileOrders } from "../../components/profile/profile-orders/profile-orders";

export const Profile = () => {
  return (
    <>
      <div className={styles.main}>
        <ProfileNavigation />
        <Switch>
          <Route path="/profile" exact={true}>
            <EditForm />
          </Route>
          <Route path="/profile/orders" exact={true}>
            <ProfileOrders />
          </Route>
        </Switch>
      </div>
    </>
  );
};
