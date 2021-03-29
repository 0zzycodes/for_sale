import React from "react";

import "./styles.scss";
const FormSelect = ({ label, value, onChange, options }) => {
  return (
    <>
      <div className="select-group">
        <label className="form-select-label">{label}</label>
        <select className="form-select" value={value} onChange={onChange}>
          {options.map((item, index) => (
            <option
              className="form-select-option"
              key={index}
              value={item.id.toLowerCase()}
            >
              {item.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default FormSelect;
