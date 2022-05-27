import {useEffect, useState, FormEvent} from "react";
import { Redirect } from "react-router-dom";
import { Link, useLocation} from "react-router-dom";
import styles from "./login.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  loginRequest,
  resetResetPassSuccess,
  resetForgotPassSuccess,
  resetUpdateSuccess,
  resetError,
} from "../../services/slices/authorization-slice";
import { TLocation } from "../../utils/types";
import { useAppSelector, useAppDispatch } from "../../services";

export const Login = () => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const onFormChange = (e: {target: {name: string, value: string}}) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const { isAuthorized, hasError } = useAppSelector((state) => state.authorization);

  const dispatch = useAppDispatch(); 
  const location = useLocation<TLocation>();

  const formSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginRequest(formValue));
  };

  useEffect(() => {
    dispatch(resetError());
    dispatch(resetForgotPassSuccess());
    dispatch(resetResetPassSuccess());
    dispatch(resetUpdateSuccess());
  }, []);

  return (
    <>
    
      {isAuthorized && <Redirect to={ location?.state?.from || "/" } />}
      <div className={styles.main}>
        <h1 className={`${styles.title} text_type_main-medium`}>Вход</h1>

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
        {hasError && <span className={styles.error}>{hasError}</span>}
        <div className={styles.links}>
          <span className="text text_type_main-default text_color_inactive">
            Вы - новый пользователь?
          </span>
          <Link
            to="/register"
            className={`${styles.link} text text_type_main-default ml-2`}
          >
            Зарегистрироваться
          </Link>
        </div>
        <div className="links">
          <span className="text text_type_main-default text_color_inactive">
            Забыли пароль?
          </span>
          <Link
            to="/forgot-password"
            className={`${styles.link} text text_type_main-default ml-2`}
          >
            Восстановить пароль
          </Link>
        </div>
      </div>
    </>
  );
};
