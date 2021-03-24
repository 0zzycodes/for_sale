import React from "react";

import "./styles.scss";

const Dropdown = ({ dropdownVisible, children, style }) => {
  return (
    <div
      id="dropdown-wrapper"
      className={`dropdown-container ${dropdownVisible ? "show" : ""}`}
      style={style}
    >
      <div className="dropdown-content">{children}</div>
    </div>
  );
};

export default Dropdown;
