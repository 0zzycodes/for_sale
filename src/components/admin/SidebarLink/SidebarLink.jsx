import React from "react";
import { Link, useLocation } from "react-router-dom";
import { colors } from "../../../constants/Colors";
import Spacing from "../../common/Spacing/Spacing";

import "./styles.scss";

const SidebarLink = ({ to, icon, label, sidebarCollapsed }) => {
  const location = useLocation();
  return (
    <Link to={to} className="sidebar-link-wrapper">
      <div
        className="flex-vertical-center sidebar-link"
        style={
          location.pathname === to
            ? { borderRight: `0.3em solid ${colors.black}` }
            : {}
        }
      >
        <div
          className={`sidebar-link-icon ${
            location.pathname === to && "sidebar-active-icon"
          }`}
        >
          {icon}
        </div>
        <Spacing width="1em" />
        <span
          className={`sidebar-link-text ${
            location.pathname === to && "sidebar-active-text"
          } ${sidebarCollapsed && "hide"}`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

export default SidebarLink;
