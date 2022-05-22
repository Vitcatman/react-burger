import {  useState, FormEvent } from "react";
import { Link, Redirect } from "react-router-dom";
import styles from "./register.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  registerUser,
} from "../../services/slices/authorization-slice";
import { useAppSelector, useAppDispatch } from "../../services";

export const Register = () => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
    name: "",
  });

  const dispatch = useAppDispatch();
  const { isAuthorized } = useAppSelector((state) => state.authorization);

  const formChange = (e: { target: { name: string; value: string } }) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const formSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(registerUser(formValue));
  };

  return (
    <>
      {isAuthorized && <Redirect to={{ pathname: "/" }} />}
      <div className={styles.main}>
        <h1 className={`${styles.title} text_type_main-medium`}>Регистрация</h1>

        <form className={`${styles.form} mb-20`} onSubmit={formSubmit}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={formChange}
            value={formValue.name}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
          <Input
            type={"email"}
            placeholder={"E-mail"}
            onChange={formChange}
            value={formValue.email}
            name={"email"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
          <PasswordInput
            onChange={formChange}
            value={formValue.password}
            name={"password"}
          />
          <Button type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </form>
        <div className={styles.links}>
          <span className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?
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
