import React from "react";
import { AntDesign, Octicons } from "react-web-vector-icons";
import { colors } from "../../../constants/Colors";
import Spacing from "../Spacing/Spacing";

import "./styles.scss";

const RegisterPath = ({ step, setStep, choice, completed }) => {
  const styles = {
    icon: {
      border: ".3em solid #f5f6f7",
      borderRadius: "50%",
      padding: ".3em",
      transition: "all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    },
  };
  const onStepChange = (e) => {
    if (step >= 1 || step <= 4) setStep(e);
  };
  return (
    <div className="flex-horizontal-center path">
      <button
        className={`btn path-btn ${step > 1 && !completed ? "show-btn" : null}`}
        onClick={() => {
          onStepChange(step - 1);
        }}
      >
        prev
      </button>
      <Spacing width={"3em"} />
      <div style={step >= 1 ? styles.icon : {}}>
        <AntDesign name="star" size={20} color={colors.black} />
      </div>
      <div
        className="line"
        style={step > 1 ? { backgroundColor: "#ffffff" } : {}}
      ></div>

      <div style={step >= 2 ? styles.icon : {}}>
        <AntDesign name="star" size={20} color={colors.black} />
      </div>
      <div
        className="line"
        style={step > 2 ? { backgroundColor: "#ffffff" } : {}}
      ></div>
      <div style={step >= 3 ? styles.icon : {}}>
        <AntDesign name="star" size={20} color={colors.black} />
      </div>
      <div
        className="line"
        style={step > 3 ? { backgroundColor: "#ffffff" } : {}}
      ></div>
      <div style={step >= 4 ? styles.icon : {}}>
        <Octicons name="verified" size={20} color={colors.black} />
      </div>
      <Spacing width={"3em"} />
      <button
        className={`btn path-btn ${step < 4 && "show-btn"}`}
        onClick={() => {
          if ((step === 2 && !choice.plan) || step === 3) {
            return;
          }
          onStepChange(step + 1);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default RegisterPath;
