import React from "react";

import "./styles.scss";

const Dialog = ({
  dialogVisible,
  setDialogVisible,
  children,
  style,
  preventDefault,
}) => {
  const popup = !preventDefault ? document.getElementById("popup-wrapper") : "";

  window.onclick = (event) => {
    if (!preventDefault && event.target === popup) {
      setDialogVisible(false);
    }
  };
  if (dialogVisible) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "scroll";
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
