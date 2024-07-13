import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Header.module.scss";

import { useDispatch } from "react-redux";
import { removeEdit } from "../../redux/slices/newOrder/sliceNewOrder";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  interface NavigationItemProps {
    id: number;
    title: string;
    navigationPath: string;
  }

  const navigationItems: NavigationItemProps[] = [
    { id: 1, title: "Welcome", navigationPath: "/welcome" },
    { id: 2, title: "Orders", navigationPath: "/orders" },
    { id: 3, title: "New Order", navigationPath: "/newOrder" },
  ];

  const navigate = useNavigate();
  const handleActiv = (navPath: string): void => {
    navigate(navPath);
    dispatch(removeEdit());
  };
  return (
    <header className={classes.header}>
      <div className={`container`}>
        <div className={classes.header__inner}>
          <nav className={classes.navigation}>
            <ul className={classes.navigation__list}>
              {navigationItems.map((elem) => (
                <li
                  className={`${classes.navigation__item} ${
                    window.location.href.includes(elem.navigationPath)
                      ? classes.active
                      : ""
                  }`}
                  key={elem.id}
                  onClick={() => handleActiv(elem.navigationPath)}
                >
                  {elem.title}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
