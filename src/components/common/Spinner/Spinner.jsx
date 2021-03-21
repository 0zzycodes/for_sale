import React from "react";
import logo from "../../../assets/icons/logo-icon.svg";
import "./styles.scss";

const Spinner = ({ style }) => (
  <div className="SpinnerOverlay" style={{ ...style }}>
    <img src={logo} alt="logo" className="SpinnerImage" />
    <div className="SpinnerContainer"></div>
  </div>
);

export default Spinner;
