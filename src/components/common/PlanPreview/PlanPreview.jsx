import React from "react";
import { useSelector } from "react-redux";
import { colors } from "../../../constants/Colors";
import { firestore } from "../../../firebase/config";
import { Nextweek } from "../../../utils/helper";
import Spacing from "../Spacing/Spacing";

import "./styles.scss";

const PlanPreview = ({
  setStep,
  setChoice,
  setLoading,
  data: { annualPrice, label, price, features, sixMonthPrice },
}) => {
  const currentUser = useSelector(({ user }) => user.currentUser);
  const onPlanSelect = () => {
    if (label === "Trial") {
      // TODO: Send request to start-trial endpoint
      setLoading(true);
      const userRef = firestore.doc(`users/${currentUser.id}`);
      userRef.update({
        hasSubcribedBefore: true,
        isSubscribed: true,
        plan: "Lite",
        lastSubDate: Date.now(),
        subExpireDate: Nextweek(),
      });
      setLoading(false);
      return setStep(4);
    }
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
          : label === "Trial"
          ? {
              backgroundImage: "linear-gradient(#00ff00ec, #7b7b7ce7)",
              color: colors.black,
            }
          : {}
      }
    >
      <h3 className="plan-label">{label}</h3>
      <Spacing height={"1em"} />
      {label === "Trial" && (
        <>
          <h2 className="plan-price">
            ₦{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </h2>
          <span className="plan-price-year">expire's in a week</span>
        </>
      )}
      {label !== "Trial" && (
        <>
          <h2 className="plan-price">
            ₦{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} / Month
          </h2>
          <span className="plan-price-year">
            ₦{sixMonthPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} /
            6 Month
          </span>
          <br />
          <span className="plan-price-year">
            ₦{annualPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} / 1
            Year
          </span>
        </>
      )}
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
        className={`btn select-plan-btn ${
          label === "Pro" && "pro-select-plan-btn"
        }`}
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
