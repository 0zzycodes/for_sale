import React from "react";
import { colors } from "../../../constants/Colors";
import Spacing from "../Spacing/Spacing";
import "./styles.scss";

const PlanPreview = ({
  setStep,
  setChoice,
  data: { annualPrice, label, price, features, sixMonthPrice },
}) => {
  const onPlanSelect = () => {
    const data = {
      plan: label,
      data: [
        {
          label: "1 Month",
          price,
        },
        {
          label: "6 Month",
          price: sixMonthPrice,
        },
        {
          label: "1 year",
          price: annualPrice,
        },
      ],
    };
    setChoice(data);
    setStep(3);
  };
  return (
    <div
      className="plan-container"
      style={
        label === "Pro"
          ? {
              backgroundImage: "linear-gradient(#f5f6f7ec, #7b7b7ce7)",
              color: colors.black,
            }
          : {}
      }
    >
      <h3 className="plan-label">{label}</h3>
      <Spacing height={"1em"} />
      <h2 className="plan-price">
        ₦{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} / Month
      </h2>
      <span className="plan-price-year">
        ₦{sixMonthPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} / 6
        Month
      </span>
      <br />
      <span className="plan-price-year">
        ₦{annualPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} / 1 Year
      </span>
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
        onClick={onPlanSelect}
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
