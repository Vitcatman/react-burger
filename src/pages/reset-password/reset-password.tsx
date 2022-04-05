import React, { useEffect, useState } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import style from "./register.module.css";
import AppHeader from "../../components/app-header/app-header";
import styles from "./reset-password.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const ResetPassword = () => {
  const [formValue, setFormValue] = useState({
    password: "",
    token: "",
  });

  const formChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <AppHeader />
      <div className={styles.main}>
        <h1 className={styles.title} text_type_main-medium>
          Восстановление пароля
        </h1>

        <form className={`${styles.form} mb-20`}>
          <PasswordInput
            onChange={formChange}
            value={formValue.password}
            name={"password"}
          />

          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={formChange}
            value={formValue.token}
            name={"token"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />

          <Button type="primary" size="medium">
            Сохранить
          </Button>
        </form>
        {/* { error && <span className={styles.error}>{error}</span> } */}
        <div className={styles.links}>
          <span className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </span>
          <Link
            to="/login"
            className={`${styles.link} text text_type_main-default ml-2`}
          >
            Войти
          </Link>
        </div>
      </div>
    </>
  );
};
