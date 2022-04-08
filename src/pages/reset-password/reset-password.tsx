import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AppHeader from "../../components/app-header/app-header";
import styles from "./reset-password.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  resetPass,
  authorizationSelector,
} from "../../services/slices/authorization-slice";

export const ResetPassword = () => {
  const [formValue, setFormValue] = useState({
    password: "",
    token: "",
  });

  const { resetPasswordSuccess, hasError, isAuthorized } = useSelector(
    authorizationSelector
  );
  const dispatch = useDispatch();

  const formChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    // @ts-ignore
    dispatch(resetPass(formValue));
  };
  return (
    <>
      {isAuthorized && <Redirect to={{ pathname: "/" }} />}
      {resetPasswordSuccess && <Redirect to={{ pathname: "/login" }} />}
      <AppHeader />
      <div className={styles.main}>
        <h1 className={`${styles.title} text_type_main-medium}`}>
          Восстановление пароля
        </h1>

        <form className={`${styles.form} mb-20`} onSubmit={formSubmit}>
          <PasswordInput
            onChange={formChange}
            value={formValue.password}
            name={"password"}
          />

          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
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
        {hasError && <span className={styles.error}>{hasError}</span>}
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
