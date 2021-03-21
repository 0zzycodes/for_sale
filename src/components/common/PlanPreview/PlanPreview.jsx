import React from "react";
import { colors } from "../../../constants/Colors";
import Spacing from "../Spacing/Spacing";
import "./styles.scss";

const PlanPreview = ({ data: { annualPrice, label, price, features } }) => {
  return (
    <div
      className="plan-container"
      style={
        label === "Pro"
          ? { backgroundColor: colors.tint, color: colors.white }
          : {}
      }
    >
      <h3 className="plan-label">{label}</h3>
      <Spacing height={"1em"} />
      <h2 className="plan-price">{price}</h2>
      <span className="plan-price-year">{annualPrice}</span>
      <Spacing height={"1em"} />
      <div className="features">
        {features.map((item, index) => (
          <p className="feature" key={index}>
            {item}
          </p>
        ))}
      </div>
      <Spacing height={"3em"} />
      <span
        className="btn select-plan-btn"
        style={
          label === "Pro"
            ? { backgroundColor: colors.white, color: colors.black }
            : {}
        }
      >
        Select Plan
      </span>
      {label === "Pro" && (
        <div className="tag">
          <span className="btn tag-btn">Popular</span>
        </div>
      )}
    </div>
  );
};

export default PlanPreview;
