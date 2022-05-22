import { useEffect, useState, FormEvent } from "react";
import styles from "./profile-form.module.css";
import {
  updateUserData,
  updateToken,
  getUserData,
} from "../../../services/slices/authorization-slice";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getCookie } from "../../../utils/cookies";
import { useAppDispatch, useAppSelector } from "../../../services/index";

export const EditForm = () => {
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [buttons, setButtons] = useState(false);
  const { user, hasError, updateSuccess } = useAppSelector(
    (state) => state.authorization
  );
  const dispatch = useAppDispatch();

  const onFormChange = (e: { target: { name: string; value: string } }) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
    setButtons(true);
  };

  useEffect(() => {
    if (
      localStorage.getItem("refreshToken") &&
      getCookie("accessToken") == null
    ) {
      dispatch(updateToken()).then(() => dispatch(getUserData()));
    }
    if (getCookie("accessToken")) {
      dispatch(getUserData());
    }
    setFormValue({
      name: user.name,
      email: user.email,
      password: "",
    });
  }, [user]);

  const formSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (getCookie("accessToken")) {
      dispatch(updateUserData(formValue));
    } else {
      dispatch(updateToken()).then(() => dispatch(updateUserData(formValue)));
    }
  };

  return (
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
  );
};
