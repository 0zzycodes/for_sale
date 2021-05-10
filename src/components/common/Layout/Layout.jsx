import React from "react";
import { Link, useLocation } from "react-router-dom";
import Clock from "../Clock/Clock";
import logo from "../../../assets/images/logo.png";
import Spacing from "../Spacing/Spacing";
import "./styles.scss";

const AuthLayout = ({ children, notfound }) => {
  const location = useLocation();
  return (
    <>
      {!notfound && (
        <nav className="flex-vertical-center navbar">
          <div className="logo-container">
            <Link to="/">
              <img src={logo} alt="Stoque logo" className="logo" />
            </Link>
          </div>
          <span className="time">
            <Clock />
          </span>
        </nav>
      )}

      <div className="children-container">
        <Spacing height={"6em"} />
        {children}
      </div>
    </>
  );
};

export default AuthLayout;
