import React from "react";
import "./styles.scss";

const CustomPopUp = ({
  message,
  onClick,
  type,
  customStyles,
  customTextStyles,
}) => {
  return (
    <div
      className={`container ${
        type === "error" && "containerErr containerErr"
      } `}
      style={customStyles}
    >
      <span className="text" style={customTextStyles}>
        {message}
      </span>
      {onClick && (
        <button onPress={onClick}>
          <span>close</span>
        </button>
      )}
    </div>
  );
};

export default CustomPopUp;
