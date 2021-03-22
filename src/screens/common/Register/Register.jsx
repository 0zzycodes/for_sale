import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MaterialCommunityIcons } from "react-web-vector-icons";
import CustomButton from "../../../components/common/CustomButton/CustomButton";
import CustomInput from "../../../components/common/CustomInput/CustomInput";
import PaymentPlanPreview from "../../../components/common/PaymentPlanPreview/PaymentPlanPreview";
import PayWithPaystack from "../../../components/common/PayWithPaystack/PayWithPaystack";
import PlanPreview from "../../../components/common/PlanPreview/PlanPreview";
import RegisterPath from "../../../components/common/RegisterPath/RegisterPath";
import Spacing from "../../../components/common/Spacing/Spacing";
import { colors } from "../../../constants/Colors";
import { Lite, Pro } from "../../../constants/plans";

import "./styles.scss";

const Register = () => {
  const [step, setStep] = useState(1);
  const [planAmount, setPlanAmount] = useState(null);
  const [completed, setCompleted] = useState(false);
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
      <RegisterPath
        step={step}
        setStep={setStep}
        choice={choice}
        completed={completed}
      />
      <Spacing height="4em" />
      {step === 1 && <RegistrationForm />}
      {step === 2 && (
        <div className={`select-plan ${step === 2 && "show-plan"}`}>
          <PlanPreview data={Lite} setStep={setStep} setChoice={setChoice} />
          <PlanPreview data={Pro} setStep={setStep} setChoice={setChoice} />
        </div>
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
          <button className="btn success-btn">
            <Link to="/">Go to dashboard</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Register;

const RegistrationForm = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [businessName, setBusinessName] = useState();
  const [homeAddress, setHomeAddress] = useState();
  const [passcode, setPasscode] = useState();
  const [confirmPasscode, setConfirmPasscode] = useState();
  const onSubmit = () => {};

  return (
    <form onSubmit={onSubmit} className="form-container">
      <div className="flex-horizontal-center inputGrouping">
        <CustomInput
          label="First name"
          value={firstName}
          type={"text"}
          onChange={({ target }) => setFirstName(target.value)}
        />
        <Spacing height="2em" />
        <CustomInput
          label="Last name"
          value={lastName}
          type={"text"}
          onChange={({ target }) => setLastName(target.value)}
        />
      </div>

      <Spacing height="2em" />
      <CustomInput
        label="Business name"
        value={businessName}
        type={"text"}
        onChange={({ target }) => setBusinessName(target.value)}
      />
      <Spacing height="2em" />
      <CustomInput
        label="Email"
        value={email}
        type={"email"}
        onChange={({ target }) => setEmail(target.value)}
      />
      <Spacing height="2em" />
      <CustomInput
        label="Phone number"
        value={phone}
        type={"number"}
        onChange={({ target }) => setPhone(target.value)}
      />
      <Spacing height="2em" />
      <CustomInput
        label="Home address"
        value={homeAddress}
        type={"address"}
        onChange={({ target }) => setHomeAddress(target.value)}
      />
      <Spacing height="2em" />
      <CustomInput
        label="Passcode"
        value={passcode}
        type={"password"}
        onChange={({ target }) => setPasscode(target.value)}
      />
      <Spacing height="2em" />
      <CustomInput
        label="Confirm passcode"
        value={confirmPasscode}
        type={"password"}
        onChange={({ target }) => setConfirmPasscode(target.value)}
      />
      <Spacing height="3em" />
      <CustomButton
        label="Register"
        onClick={onSubmit}
        className="register-btn"
      />
    </form>
  );
};
