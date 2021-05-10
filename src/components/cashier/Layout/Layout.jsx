import React, { useState } from "react";
import { AntDesign, Feather } from "react-web-vector-icons";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../../redux/user/actions";
import { colors } from "../../../constants/Colors";
import Dropdown from "../Dropdown/Dropdown";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

import "./styles.scss";
const CashierDashboardLayout = ({ children }) => {
  const currentUser = useSelector(({ user }) => user.currentUser);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [sidebarCollapsed, collapsSidebar] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const onLogout = () => {
    setDropdownVisible(false);
    dispatch(setCurrentUser(null));
    history.push(`/login`);
  };
  return (
    <>
      <div className="flex-horizontal-center admin-dashboard-layout">
        <Sidebar sidebarCollapsed={sidebarCollapsed} />
        <main className={`main ${sidebarCollapsed && "mainExpand"}`}>
          <Navbar
            collapsSidebar={collapsSidebar}
            sidebarCollapsed={sidebarCollapsed}
            dropdownVisible={dropdownVisible}
            setDropdownVisible={setDropdownVisible}
          />
          <div className="admin-children-container">{children}</div>
        </main>
      </div>
      <Dropdown
        dropdownVisible={dropdownVisible}
        setDropdownVisible={setDropdownVisible}
        style={{ top: "8em", right: "1em", minHeight: "6em" }}
      >
        {/* <div
          className="dropdownLink"
          onClick={() => {
            history.push("/settings");
            setDropdownVisible(false);
          }}
        >
          <Feather name="settings" size={20} color="black" />
          <h4>Settings</h4>
        </div> */}
        <div className="dropdownLink logout" onClick={onLogout}>
          <AntDesign name="logout" size={18} color={colors.danger} />
          <h4>Logout</h4>
        </div>
      </Dropdown>
    </>
  );
};

export default CashierDashboardLayout;
