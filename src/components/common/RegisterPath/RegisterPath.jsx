import React from "react";
import { AntDesign, Octicons } from "react-web-vector-icons";
import { colors } from "../../../constants/Colors";
import Spacing from "../Spacing/Spacing";

import "./styles.scss";

const RegisterPath = ({ step }) => {
  const styles = {
    icon: {
      border: ".3em solid #f5f6f7",
      borderRadius: "50%",
      padding: ".5em",
    },
  };
  return (
    <div className="flex-horizontal-center path">
      <span className="btn pathBtn">prev</span>
      <Spacing width={"3em"} />
      <div style={step >= 1 ? styles.icon : {}}>
        <AntDesign name="star" size={22} color={colors.black} />
      </div>
      <div
        className="line"
        style={step > 1 ? { backgroundColor: "#ffffff" } : {}}
      ></div>

      <div style={step >= 2 ? styles.icon : {}}>
        <AntDesign name="star" size={22} color={colors.black} />
      </div>
      <div
        className="line"
        style={step > 2 ? { backgroundColor: "#ffffff" } : {}}
      ></div>
      <div style={step >= 3 ? styles.icon : {}}>
        <AntDesign name="star" size={22} color={colors.black} />
      </div>
      <div
        className="line"
        style={step > 23 ? { backgroundColor: "#ffffff" } : {}}
      ></div>
      <div style={step >= 4 ? styles.icon : {}}>
        <Octicons name="verified" size={22} color={colors.black} />
      </div>
      <Spacing width={"3em"} />
      <span className="btn pathBtn">Next</span>
    </div>
  );
};

export default RegisterPath;
