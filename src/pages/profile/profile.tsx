import { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import AppHeader from "../../components/app-header/app-header";
import styles from "./profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  logOut,
  authorizationSelector,
  updateUserData,
  updateToken,
  getUserData,
} from "../../services/slices/authorization-slice";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getCookie } from "../../utils/cookies";

export const Profile = () => {
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [buttons, setButtons] = useState(false);
  const { user, hasError, updateSuccess, isAuthorized } = useSelector(
    authorizationSelector
  );
  const location = useLocation();
  const dispatch = useDispatch();

  const loggingOut = () => {
    dispatch(logOut());
  };

  const onFormChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
    setButtons(true);
  };

  useEffect(() => {
    if (localStorage.getItem('refreshToken') && getCookie("accessToken") == null) {
      dispatch(updateToken());
    }
    if (getCookie("accessToken") != null) {
      dispatch(getUserData())
      setFormValue({
        name: user.name,
        email: user.email,
        password: "",
      });
    }

  }, [user]);


  const formSubmit = (e) => {
    e.preventDefault();
    // @ts-ignore
    dispatch(updateUserData(formValue));
  };

  return (
    <>
      <div className={styles.main}>
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
              to={isAuthorized ? "/profile" : "/login"}
              className={styles.link}
              onClick={loggingOut}
              activeClassName={styles.link_active}
            >
              <span className="text text_type_main-medium mb-10">Выход</span>
            </NavLink>
            <span className=" text text_type_main-small text_color_inactive mt-20">
              В этом разделе вы можете изменить свои персональные данные
            </span>
          </nav>
        </section>
        {location.pathname === "/profile/orders" && (
          <span className=" text text_type_main-small text_color_inactive mt-20">
            В этом разделе скоро будет реализована лента заказов
          </span>
        )}

        {location.pathname === "/profile" && (
          <section className={styles.wrapper}>
            <form className={`${styles.form} mb-4`} onSubmit={formSubmit}>
              <Input
                type={"text"}
                placeholder={"Имя"}
                onChange={onFormChange}
                value={formValue.name}
                name={"name"}
                icon={"EditIcon"}
                error={false}
                errorText={"Ошибка"}
                size={"default"}
              />
              <Input
                type={"email"}
                placeholder={"Логин"}
                onChange={onFormChange}
                value={formValue.email}
                name={"email"}
                icon={"EditIcon"}
                error={false}
                errorText={"Ошибка"}
                size={"default"}
              />
              <Input
                type={"text"}
                placeholder={"Пароль"}
                onChange={onFormChange}
                value={formValue.password}
                name={"password"}
                icon={"EditIcon"}
                error={false}
                errorText={"Ошибка"}
                size={"default"}
              />
              {buttons && (
                <Button type="primary" size="medium">
                  Сохранить
                </Button>
              )}
            </form>
            {hasError && <span className={styles.error}>{hasError}</span>}
            {updateSuccess && (
              <span className={styles.success}>Профиль успешно обновлен</span>
            )}
          </section>
        )}
      </div>
    </>
  );
};
