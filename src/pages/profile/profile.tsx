import React, { useEffect, useState } from "react";
import { useHistory, Link, useLocation, NavLink } from "react-router-dom";
import AppHeader from "../../components/app-header/app-header";
import styles from "./profile.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const Profile = () => {
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onFormChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <AppHeader />
      <div className={styles.main}>
        <section className={styles.menu}>
          <nav className={styles.navbar}>
            
              <NavLink to={"/"} className={`${styles.link}`}>
                <span className="text text_type_main-medium mb-10">
                  Профиль
                </span>
              </NavLink>
              <a href={"#"} className={`${styles.link} ml-5`}>
                <span className="text text_type_main-medium text_color_inactive mb-10">
                  История заказов
                </span>
              </a>
           
            
              <NavLink to={"/login"} className={styles.link}>
                <span className="text text_type_main-medium text_color_inactive mb-10">
                  Выход
                </span>
              </NavLink>
              <span className=" text text_type_main-default text_color_inactive mt-20">
            В этом разделе вы можете 
            изменить свои персональные данные
          </span>
          </nav>

        </section>
        <section className={styles.wrapper}>
          <form className={`${styles.form} mb-20`}>
            <Input
              type={"text"}
              placeholder={"Имя"}
              onChange={onFormChange}
              value={formValue.name}
              name={"name"}
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
              error={false}
              errorText={"Ошибка"}
              size={"default"}
            />
            <Button type="primary" size="medium">
              Сохранить
            </Button>
          </form>

          {/* { error && <span className={styles.error}>{error}</span> } */}
          {/* { success && <span className={styles.error}>Профиль успешно обновлен</span> } */}
        </section>
      </div>
    </>
  );
};
