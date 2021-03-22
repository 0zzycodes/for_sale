import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import Spacing from "../Spacing/Spacing";
import "./styles.scss";

const AuthLayout = ({ children }) => {
  const location = useLocation();
  return (
    <>
      <nav className="flex-vertical-center navbar">
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="Stoque logo" className="logo" />
          </Link>
        </div>
        <span className="btn">
          <Link
            className="nav-link"
            to={location.pathname === `/login` ? `/register` : `/login`}
          >
            {location.pathname === `/login` ? "Register" : "Login"}
          </Link>
        </span>
      </nav>

      <div className="children-container">
        <Spacing height={"6em"} />
        {children}
      </div>
    </>
  );
};

export default AuthLayout;
