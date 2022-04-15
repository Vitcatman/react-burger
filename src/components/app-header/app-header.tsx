import React from "react";
import style from "./app-header.module.css";
import {
  Logo,
  ListIcon,
  BurgerIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, Link } from 'react-router-dom';

const AppHeader = () => {
  return (
    <header className={style.header}>
      <nav className={style.navbar}>
        <div className={style.main_navigation}>
          <NavLink to={"/"} exact className={`${style.link} mr-5`} activeClassName={style.link_active}>
            <BurgerIcon type="primary" />
            <span className="text text_type_main-default ml-2">
              Конструктор
            </span>
          </NavLink>
          <NavLink to={'/feed'} exact className={`${style.link} ml-5`} activeClassName={style.link_active}>
            <ListIcon type="secondary" />
            <span className="text text_type_main-default ml-2">
              Лента заказов
            </span>
          </NavLink>
        </div>
        <div className={style.container}>
          <NavLink to={"/"} className={style.link}>
            <Logo />
          </NavLink>
          <NavLink to={"/profile"} exact className={style.link} activeClassName={style.link_active}>
            <ProfileIcon type="secondary" />
            <span className="text text_type_main-default ml-2">
              Личный кабинет
            </span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;
