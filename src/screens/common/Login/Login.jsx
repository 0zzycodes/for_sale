import React, { useState } from "react";
import CustomButton from "../../../components/common/CustomButton/CustomButton";
import CustomInput from "../../../components/common/CustomInput/CustomInput";
import CustomPopUp from "../../../components/common/CustomPopUp/CustomPopUp";
import Spacing from "../../../components/common/Spacing/Spacing";
import Spinner from "../../../components/common/Spinner/Spinner";
import { colors } from "../../../constants/Colors";
import { auth } from "../../../firebase/config";
import "./styles.scss";

const Login = () => {
  const [loginAs, setLoginAs] = useState("admin");
  const [loading, setLoading] = useState(false);
  const activeStyle = {
    backgroundColor: colors.black,
    color: colors.white,
    boxShadow: "0px 3px 6px #00000015",
    borderRadius: "4em",
  };
  return (
    <div className="login">
      <Spacing height="3em" />
      <div className="head">
        <span className="head-text-bold">Welcome back</span>
        <Spacing height="1em" />
        <span className="head-text-light">Login to your account</span>
      </div>
      <Spacing height="3em" />
      <div className="flex-horizontal-center role-navigator">
        <div
          className="admin-role"
          style={loginAs === "admin" ? activeStyle : {}}
          onClick={() => setLoginAs("admin")}
        >
          {" "}
          <span>Admin</span>{" "}
        </div>
        <Spacing width="5em" />
        <Spacing width="5em" />
        <div
          className="cashier-role"
          style={loginAs === "cashier" ? activeStyle : {}}
          onClick={() => setLoginAs("cashier")}
        >
          {" "}
          <span>Cashier</span>{" "}
        </div>
      </div>
      <Spacing height="6em" />
      {loginAs === "admin" ? (
        loading ? (
          <Spinner style={{ height: "20vh" }} />
        ) : (
          <AdminLogin setLoading={setLoading} />
        )
      ) : loading ? (
        <Spinner style={{ height: "20vh" }} />
      ) : (
        <CashierLogin setLoading={setLoading} />
      )}
    </div>
  );
};

export default Login;

const AdminLogin = ({ setLoading }) => {
  const [email, setEmail] = useState();
  const [passcode, setPasscode] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await auth.signInWithEmailAndPassword(email, passcode);
      setEmail("");
      setPasscode("");
      setLoading(false);
    } catch (error) {
      error.code === "auth/wrong-password"
        ? setErrorMessage(
            "The password is invalid or the user does not have a password."
          )
        : error.code === "auth/user-not-found"
        ? setErrorMessage(
            "There is no user record corresponding to this identifier."
          )
        : setErrorMessage("Shit just got real");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="form-container">
      {errorMessage !== "" ? (
        <CustomPopUp
          message={`${errorMessage}`}
          type={"error"}
          customStyles={{ backgroundColor: colors.danger }}
          customTextStyles={{ color: colors.white }}
        />
      ) : null}
      <Spacing height="2em" />
      <CustomInput
        label="Email"
        value={email}
        type={"email"}
        onChange={({ target }) => setEmail(target.value)}
      />
      <Spacing height="2em" />
      <CustomInput
        label="Passcode"
        value={passcode}
        type={"password"}
        onChange={({ target }) => setPasscode(target.value)}
      />
      <Spacing height="3em" />
      <CustomButton label="Login" onClick={onSubmit} className="login-btn" />
    </form>
  );
};
const CashierLogin = ({ setLoading }) => {
  const [shopCode, setShopCode] = useState();
  const [branch, setBranch] = useState();
  const [username, setUsername] = useState();
  const [passcode, setPasscode] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: Send Cashier login request login to cashier login endpoint
      setShopCode("");
      setBranch("");
      setUsername("");
      setPasscode("");
      setLoading(false);
    } catch (error) {
      error.code === "auth/wrong-password"
        ? setErrorMessage("The password is invalid")
        : error.code === "auth/user-not-found"
        ? setErrorMessage(
            "There is no user record corresponding to this identifier."
          )
        : setErrorMessage("Shit just got real");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="form-container">
      {errorMessage !== "" ? (
        <CustomPopUp
          message={`${errorMessage}`}
          type={"error"}
          customStyles={{ backgroundColor: colors.danger }}
          customTextStyles={{ color: colors.white }}
        />
      ) : null}
      <Spacing height="2em" />
      <div className="flex-horizontal-center inputGrouping">
        <CustomInput
          label="Shop code"
          value={shopCode}
          type={"number"}
          onChange={({ target }) => setShopCode(target.value)}
        />
        <Spacing height="2em" />
        <CustomInput
          label="Branch code"
          value={branch}
          type={"number"}
          onChange={({ target }) => setBranch(target.value)}
        />
      </div>

      <Spacing height="2em" />
      <CustomInput
        label="Username"
        value={username}
        type={"username"}
        onChange={({ target }) => setUsername(target.value)}
      />
      <Spacing height="2em" />
      <CustomInput
        label="Passcode"
        value={passcode}
        type={"password"}
        onChange={({ target }) => setPasscode(target.value)}
      />
      <Spacing height="3em" />
      <CustomButton label="Login" onClick={onSubmit} className="login-btn" />
    </form>
  );
};
