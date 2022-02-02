import React from "react";
import style from "./app-header.module.css";
import {
  Logo,
  ListIcon,
  BurgerIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
  return (
    <header className={style.header}>
      <nav className={style.navbar}>
        <div className={style.main_navigation}>
          <a href={"#"} className={`${style.link} mr-5`}>
            <BurgerIcon type="primary" />
            <span className='text text_type_main-default ml-2'>Конструктор</span>
          </a>
          <a href={"#"} className={`${style.link} ml-5`} >
            <ListIcon type="secondary" />
            <span className='text text_type_main-default text_color_inactive ml-2'>Лента заказов</span>
          </a>
        </div>
        <div className={style.container}>
        <a href={"#"} className={style.link}>
          <Logo />
        </a>
        <a href={"#"} className={style.link}>
          <ProfileIcon type="secondary" />
          <span className='text text_type_main-default text_color_inactive ml-2'>Личный кабинет</span>
        </a>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;
