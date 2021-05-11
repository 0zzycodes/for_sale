import React from "react";

import "./styles.scss";

const CustomInput = ({ style, disabled, onChange, label, ...otherProps }) => {
  return (
    <div className="group" style={style}>
      <label className={`form-input-label`}>{label}</label>
      <input
        onChange={onChange}
        className="form-input"
        style={disabled ? { cursor: "not-allowed" } : {}}
        {...otherProps}
        disabled={disabled}
      />
    </div>
  );
};

export default CustomInput;
