import React from "react";

import "./styles.scss";

const Dialog = ({ dialogVisible, setDialogVisible, children, style }) => {
  const popup = document.getElementById("popup-wrapper");

  window.onclick = (event) => {
    if (event.target === popup) {
      setDialogVisible(false);
    }
  };
  return (
    <div
      id="popup-wrapper"
      className={`popup-container ${dialogVisible ? "show" : ""}`}
    >
      <div className="popup-content" style={style}>
        {children}
      </div>
    </div>
  );
};

export default Dialog;
