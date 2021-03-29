import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MaterialCommunityIcons } from "react-web-vector-icons";
import PaymentPlanPreview from "../../../components/common/PaymentPlanPreview/PaymentPlanPreview";
import PayWithPaystack from "../../../components/common/PayWithPaystack/PayWithPaystack";
import PlanPreview from "../../../components/common/PlanPreview/PlanPreview";
import RegisterPath from "../../../components/common/RegisterPath/RegisterPath";
import RegistrationForm from "../../../components/common/RegistrationForm/RegistrationForm";
import Spacing from "../../../components/common/Spacing/Spacing";
import Spinner from "../../../components/common/Spinner/Spinner";
import { colors } from "../../../constants/Colors";
import { Lite, Pro, Trial } from "../../../constants/plans";
import { setStep as setStepAction } from "../../../redux/dashboard/actions";

import "./styles.scss";

const Register = () => {
  const step = useSelector((state) => state.dashboard.step);
  const dispatch = useDispatch();
  const setStep = (e) => dispatch(setStepAction(e));
  const [planAmount, setPlanAmount] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [choice, setChoice] = useState({
    plan: null,
    data: null,
  });

  return (
    <div className="register">
      <Spacing height="2em" />
      <div className="head">
        <span className="head-text-bold">Create Account</span>
        <Spacing height="1em" />
        <span className="head-text-light">
          Let get you started, this won't take long
        </span>
      </div>
      <Spacing height="2em" />
      <RegisterPath step={step} />
      <Spacing height="4em" />
      {step === 1 && <RegistrationForm setStep={setStep} />}
      {step === 2 && (
        <>
          {loading ? (
            <Spinner style={{ height: "20vh" }} />
          ) : (
            <div className={`select-plan ${step === 2 && "show-plan"}`}>
              <PlanPreview
                data={Trial}
                setStep={setStep}
                setChoice={setChoice}
                setLoading={setLoading}
              />
              <PlanPreview
                data={Lite}
                setStep={setStep}
                setChoice={setChoice}
                setLoading={setLoading}
              />
              <PlanPreview
                data={Pro}
                setStep={setStep}
                setChoice={setChoice}
                setLoading={setLoading}
              />
            </div>
          )}
        </>
      )}
      {step === 3 && (
        <div
          className={`pay-plan-container ${
            step === 3 && "show-pay-plan-container"
          }`}
        >
          <div className={`select-pay-plan ${step === 3 && "show-pay-plan"}`}>
            {choice.data.map((item, index) => (
              <PaymentPlanPreview
                key={index}
                data={item}
                setPlanAmount={setPlanAmount}
              />
            ))}
          </div>
          <Spacing height={"3em"} />
          {planAmount && (
            <PayWithPaystack
              amount={planAmount * 1}
              setStep={setStep}
              setCompleted={setCompleted}
              setLoading={setLoading}
              plan={choice.plan}
            />
          )}
        </div>
      )}
      {step === 4 && (
        <div className="flex-center successful">
          <MaterialCommunityIcons
            name="check-decagram"
            size={80}
            color={colors.success}
          />
          <Spacing height={"3em"} />
          <h3 className="success-text">Registration Successful!</h3>
          <Spacing height={"1.5em"} />
          <Link to="/">
            <button className="btn success-btn" onClick={() => setStep(1)}>
              Go to dashboard
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Register;
