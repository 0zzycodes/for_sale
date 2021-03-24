import React from "react";
import "./styles.scss";
const CustomButton = ({ label, className, onClick, inverted }) => {
  return (
    <button
      className={`custom-btn ${inverted && "inverted"} ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default CustomButton;
