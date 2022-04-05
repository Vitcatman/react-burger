import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useLocation } from "react-router-dom";
import AppHeader from "../../components/app-header/app-header";
import styles from "./login.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {loginRequest, authorizationSelector } from '../../services/slices/authorization-slice'

export const Login = () => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const onFormChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const authorization = useSelector(authorizationSelector);

  const dispatch = useDispatch()

  const formSubmit = (e) => {
    e.preventDefault()
    // @ts-ignore
    dispatch(loginRequest(formValue))
   }

   console.log(authorization)

  //  if (authorization) {
  //   return (
  //     <Redirect to={'/profile' } />
  //   )
  // }

  return (
    <>
      <AppHeader />
      <div className={styles.main}>
        <h1 className={`${styles.title} text_type_main-medium`}>
          Вход
        </h1>

        <form className={`${styles.form} mb-20`} onSubmit={formSubmit}>
          <Input
            type={"email"}
            placeholder={"E-mail"}
            onChange={onFormChange}
            value={formValue.email}
            name={"email"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
          <PasswordInput
            onChange={onFormChange}
            value={formValue.password}
            name={"password"}
          />
          <Button type="primary" size="medium">
            Войти
          </Button>
        </form>
       {/* { error && <span className={styles.error}>{error}</span> } */}
       <div className={styles.links}>
           <span className="text text_type_main-default text_color_inactive">Вы - новый пользователь?</span>
           <Link to="/register" className={`${styles.link} text text_type_main-default ml-2`}>Зарегистрироваться</Link>
       </div>
       <div className="links">
           <span className="text text_type_main-default text_color_inactive">Забыли пароль?</span>
           <Link to="/forgot-password" className={`${styles.link} text text_type_main-default ml-2`}>Восстановить пароль</Link>
       </div>
      </div>
    </>
  );
};
