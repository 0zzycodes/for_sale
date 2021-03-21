import React, { useState } from "react";
import CustomInput from "../../../components/common/CustomInput/CustomInput";
import PlanPreview from "../../../components/common/PlanPreview/PlanPreview";
import RegisterPath from "../../../components/common/RegisterPath/RegisterPath";
import Spacing from "../../../components/common/Spacing/Spacing";
import { Lite, Pro } from "../../../constants/plans";

import "./styles.scss";

const Register = () => {
  const [step, setStep] = useState(2);

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
      {step === 1 && <RegistrationForm />}
      {step === 2 && (
        <div className="select-plan">
          <PlanPreview data={Lite} />
          <PlanPreview data={Pro} />
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
          type={"default"}
          onChange={({ target }) => setFirstName(target.value)}
        />
        <Spacing height="2em" />
        <CustomInput
          label="Last name"
          value={lastName}
          type={"default"}
          onChange={({ target }) => setLastName(target.value)}
        />
      </div>

      <Spacing height="2em" />
      <CustomInput
        label="Business name"
        value={businessName}
        type={"default"}
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
        type={"numeric"}
        onChange={({ target }) => setPhone(target.value)}
      />
      <Spacing height="2em" />
      <CustomInput
        label="Home address"
        value={homeAddress}
        type={"default"}
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
    </form>
  );
};
