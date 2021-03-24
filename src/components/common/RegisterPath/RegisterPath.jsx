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
      padding: ".3em",
      transition: "all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    },
  };
  return (
    <div className="flex-horizontal-center path">
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
    </div>
  );
};

export default RegisterPath;
