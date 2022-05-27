import {useState, FormEvent } from "react";
import { Link, Redirect } from "react-router-dom";
import styles from "./forgot-password.module.css";
import {
  Input, Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  forgotPassword,
} from "../../services/slices/authorization-slice";
import { useAppSelector, useAppDispatch } from "../../services";

export const ForgotPassword = () => {
  const [formValue, setFormValue] = useState({
    email: "",
  });

  const { forgotPasswordSuccess, isAuthorized } = useAppSelector((state) => state.authorization);
  const dispatch = useAppDispatch();

  const formChange = (e: { target: { name: string; value: string } }) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const formSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(forgotPassword(formValue));
  };

  return (
    <>
    {isAuthorized && <Redirect to={{ pathname: "/" }} />}
      {forgotPasswordSuccess && (
        <Redirect to={{ pathname: "/reset-password" }} />
      )}
      <div className={styles.main}>
        <h1 className={`${styles.title} text_type_main-medium`}>
          Восстановление пароля
        </h1>

        <form className={`${styles.form} mb-20`} onSubmit={formSubmit}>
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
