import React from "react";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
} from "react-web-vector-icons";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import logoIcon from "../../../assets/icons/logo-icon-light.svg";

import "./styles.scss";
import Spacing from "../../common/Spacing/Spacing";
import SidebarLink from "../SidebarLink/SidebarLink";

const Sidebar = ({ sidebarCollapsed }) => {
  return (
    <aside className={`sidebar ${sidebarCollapsed && "sidebarCollapsed"}`}>
      <div className="flex-vertical-center logo-container">
        <Link to="/">
          <img
            src={sidebarCollapsed ? logoIcon : logo}
            alt="Stoque logo"
            className={`logo ${sidebarCollapsed && "logoIcon"}`}
          />
        </Link>
      </div>
      <div className="sidebar-links">
        <SidebarLink
          to="/"
          icon={
            <AntDesign
              name="appstore1"
              size={sidebarCollapsed ? 28 : 24}
              color="black"
              className={`sidebar-link-icon`}
            />
          }
          label="Dashboard"
          sidebarCollapsed={sidebarCollapsed}
        />
        <Spacing height="3.5em" />
      </div>
    </aside>
  );
};

export default Sidebar;
