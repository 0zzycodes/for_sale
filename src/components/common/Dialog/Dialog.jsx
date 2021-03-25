import React from "react";
import { useLocation } from "react-router";

import "./styles.scss";

const Dialog = ({
  dialogVisible,
  setDialogVisible,
  children,
  style,
  preventDefault,
}) => {
  const popup = !preventDefault ? document.getElementById("popup-wrapper") : "";
  const location = useLocation();
  window.onclick = (event) => {
    if (!preventDefault && event.target === popup) {
      setDialogVisible(false);
    }
  };
  if (dialogVisible) {
    document.body.style.overflowY = "hidden";
  } else {
    location.pathname === "/register" ||
      (location.pathname === "/login" &&
        (document.body.style.overflowY = "scroll"));
  }
  return (
    <div
      id={`${!preventDefault && "popup-wrapper"}`}
      className={`popup-container ${dialogVisible ? "show" : ""}`}
    >
      <div className="popup-content" style={style}>
        {children}
      </div>
    </div>
  );
};

export default Dialog;
