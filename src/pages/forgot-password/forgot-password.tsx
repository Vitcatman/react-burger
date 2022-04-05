import React, { useEffect, useState } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import style from "./register.module.css";
import AppHeader from "../../components/app-header/app-header";
import styles from "./forgot-password.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const ForgotPassword = () => {
  const [formValue, setFormValue] = useState({
    email: "",
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
        <h1 className={`${styles.title} text_type_main-medium`}>
          Восстановление пароля
        </h1>

        <form className={`${styles.form} mb-20`}>
          
          <Input
            type={"email"}
            placeholder={"Укажите E-mail"}
            onChange={formChange}
            value={formValue.email}
            name={"email"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
          
          <Button type="primary" size="medium">
            Восстановить
          </Button>
        </form>
       {/* { error && <span className={styles.error}>{error}</span> } */}
       <div className={styles.links}>
           <span className="text text_type_main-default text_color_inactive">Вспомнили пароль?</span>
           <Link to="/login" className={`${styles.link} text text_type_main-default ml-2`}>Войти</Link>
       </div>
      </div>
    </>
  );
};

