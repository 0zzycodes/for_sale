import React from "react";
import "./styles.scss";
const CustomButton = ({ label, className, onClick }) => {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default CustomButton;
