import React from "react";

import "./styles.scss";

const CustomInput = ({ onChange, label, ...otherProps }) => {
  return (
    <div className="group">
      <label className={`form-input-label`}>{label}</label>
      <input onChange={onChange} className="form-input" {...otherProps} />
    </div>
  );
};

export default CustomInput;
