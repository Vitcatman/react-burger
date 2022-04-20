import { useEffect, useState } from "react";
import styles from "./profile-form.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  authorizationSelector,
  updateUserData,
  updateToken,
  getUserData,
} from "../../../services/slices/authorization-slice";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getCookie } from "../../../utils/cookies";

export const EditForm = () => {
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [buttons, setButtons] = useState(false);
  const { user, hasError, updateSuccess } = useSelector(authorizationSelector);
  const dispatch = useDispatch();

  const onFormChange = (e) => {
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
      // @ts-ignore
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

  const formSubmit = (e) => {
    e.preventDefault();
    if (getCookie("accessToken")) {
      // @ts-ignore
      dispatch(updateUserData(formValue));
    } else {
      // @ts-ignore
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
