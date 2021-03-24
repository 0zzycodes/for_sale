import React, { useEffect, useState } from "react";
import { MaterialIcons } from "react-web-vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { createShopAdminProfile } from "../../../firebase/auth";
import { auth } from "../../../firebase/config";
import CustomButton from "../CustomButton/CustomButton";
import CustomInput from "../CustomInput/CustomInput";
import CustomPopUp from "../CustomPopUp/CustomPopUp";
import Dialog from "../Dialog/Dialog";
import { setShowVerifyEmail } from "../../../redux/dashboard/actions";
import Spacing from "../Spacing/Spacing";
import Spinner from "../Spinner/Spinner";

import "./styles.scss";

const RegistrationForm = ({ setStep }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const showVerifyEmail = useSelector(
    ({ dashboard }) => dashboard.showVerifyEmail
  );

  const [emailVerified, setEmailVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [passcode, setPasscode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmPasscode, setConfirmPasscode] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentUser && currentUser.emailVerified) {
      setEmailVerified(true);
    }
  }, [currentUser]);
  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      businessName.trim() === "" ||
      email.trim() === "" ||
      phone.trim() === "" ||
      homeAddress.trim() === "" ||
      passcode.trim() === "" ||
      confirmPasscode.trim() === ""
    ) {
      setLoading(false);
      setErrorMessage(`All fields are required!`);
      return;
    }
    if (passcode !== confirmPasscode) {
      setLoading(false);
      setErrorMessage(`Password did not match!`);
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        passcode
      );
      const userRef = await createShopAdminProfile(user, {
        firstName,
        lastName,
        phone,
        businessName,
        homeAddress,
      });
      console.log("====================================");
      console.log(userRef);
      console.log("====================================");
      setLoading(false);
      dispatch(setShowVerifyEmail(true));
    } catch (error) {
      error.code === "auth/email-already-in-use"
        ? setErrorMessage(
            "The email address is already in use by another account"
          )
        : error.code === "auth/weak-password"
        ? setErrorMessage("Password should be at least 6 characters")
        : setErrorMessage("Internal server error");
      setLoading(false);
    }
  };
  const onContinue = () => {
    window.location.reload();
    dispatch(setShowVerifyEmail(false));
    setStep(2);
  };
  const onReload = () => {
    window.location.reload();
  };
  return (
    <>
      {loading ? (
        <Spinner style={{ height: "20vh" }} />
      ) : (
        <form onSubmit={(e) => onSubmit(e)} className="form-container">
          {errorMessage !== "" ? (
            <CustomPopUp
              message={`${errorMessage}`}
              type={"error"}
              customStyles={{ backgroundColor: "red" }}
              customTextStyles={{ color: "#ffffff", textAlign: "center" }}
            />
          ) : null}
          <Spacing height="2em" />
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
            onClick={(e) => onSubmit(e)}
            className="register-btn"
          />
        </form>
      )}
      <Dialog dialogVisible={showVerifyEmail} preventDefault>
        <div className="flex-center verify-email">
          <Spacing height={"2em"} />
          {emailVerified ? (
            <MaterialIcons name="verified-user" size={80} color="black" />
          ) : (
            <h4>Verify your email to contiue</h4>
          )}
          <Spacing height={"2em"} />
          <h5>
            {emailVerified
              ? "Email Verifed"
              : "click this button after verfying your mail"}
          </h5>
          <Spacing height={"2em"} />
          <div className="flex-center">
            <CustomButton
              label={emailVerified ? "Continue" : "Reload"}
              onClick={() => {
                emailVerified ? onContinue() : onReload();
              }}
              className="reload-btn"
            />
            {!emailVerified && (
              <>
                <Spacing width={"1em"} />
                <span>or</span>
                <Spacing width={"1em"} />
              </>
            )}
            {!emailVerified && (
              <CustomButton
                label={"Resend"}
                onClick={() => {
                  auth.currentUser.sendEmailVerification();
                }}
                className="reload-btn"
              />
            )}
          </div>
          <Spacing height={"2em"} />
        </div>
      </Dialog>
    </>
  );
};

export default RegistrationForm;
