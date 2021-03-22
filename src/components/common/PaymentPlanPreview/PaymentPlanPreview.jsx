import React from "react";
import { colors } from "../../../constants/Colors";
import Spacing from "../Spacing/Spacing";
import "./styles.scss";

const PaymentPlanPreview = ({ data: { label, price }, setPlanAmount }) => {
  const calculatePercentageOff = () => {
    return;
  };
  return (
    <div
      className="plan-container"
      style={
        label === "1 year"
          ? {
              backgroundImage: "linear-gradient(#f5f6f7ec, #7b7b7ce7)",
              color: colors.black,
            }
          : {}
      }
      onClick={() => setPlanAmount(price * 1)}
    >
      <span className="label">{label}</span>
      <h2 className="plan-price">
        ₦{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </h2>
      <span className="discount">{calculatePercentageOff()}</span>
      <Spacing height={"1em"} />
      {label === "1 year" && (
        <div className="tag">
          <span className="btn tag-btn">Popular</span>
        </div>
      )}
    </div>
  );
};

export default PaymentPlanPreview;
