import { NavLink, useLocation } from "react-router-dom";
import styles from "./profile-navigation.module.css";
import { useDispatch } from "react-redux";
import { logOut } from "../../../services/slices/authorization-slice";

export const ProfileNavigation = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const loggingOut = () => {
    dispatch(logOut());
  };

  return (
    <>
      <section className={styles.menu}>
        <nav className={styles.navbar}>
          <NavLink
            to={"/profile"}
            className={`${styles.link}`}
            activeClassName={styles.link_active}
            exact
          >
            <span className="text text_type_main-medium mb-10">Профиль</span>
          </NavLink>
          <NavLink
            to={"/profile/orders"}
            exact
            className={`${styles.link} ml-5`}
            activeClassName={styles.link_active}
          >
            <span className="text text_type_main-medium mb-10">
              История заказов
            </span>
          </NavLink>

          <NavLink
            to={"/login"}
            className={styles.link}
            onClick={loggingOut}
            activeClassName={styles.link_active}
          >
            <span className="text text_type_main-medium mb-10">Выход</span>
          </NavLink>
          {location.pathname === "/profile" && (
            <span className=" text text_type_main-small text_color_inactive mt-20">
              В этом разделе вы можете изменить свои персональные данные
            </span>
          )}
          {location.pathname === "/profile/orders" && (
            <span className=" text text_type_main-small text_color_inactive mt-20">
              В этом разделе вы можете просмотреть свою историю заказов
            </span>
          )}
        </nav>
      </section>
    </>
  );
};
