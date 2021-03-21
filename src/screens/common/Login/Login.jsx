import React, { useState } from "react";
import CustomInput from "../../../components/common/CustomInput/CustomInput";
import Spacing from "../../../components/common/Spacing/Spacing";
import { colors } from "../../../constants/Colors";
import "./styles.scss";

const Login = () => {
  const [loginAs, setLoginAs] = useState("admin");
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
          style={
            loginAs === "admin"
              ? {
                  backgroundColor: colors.black,
                  color: colors.white,
                  boxShadow: "0px 3px 6px #00000015",
                  borderRadius: ".6em",
                }
              : {}
          }
          onClick={() => setLoginAs("admin")}
        >
          {" "}
          <span>Admin</span>{" "}
        </div>
        <Spacing width="5em" />
        <Spacing width="5em" />
        <div
          className="cashier-role"
          style={
            loginAs === "cashier"
              ? {
                  backgroundColor: colors.black,
                  color: colors.white,
                  boxShadow: "0px 3px 6px #00000015",
                  borderRadius: ".6em",
                }
              : {}
          }
          onClick={() => setLoginAs("cashier")}
        >
          {" "}
          <span>Cashier</span>{" "}
        </div>
      </div>
      <Spacing height="6em" />
      {loginAs === "admin" ? <AdminLogin /> : <CashierLogin />}
    </div>
  );
};

export default Login;

const AdminLogin = () => {
  const [shopCode, setShopCode] = useState();
  const [email, setEmail] = useState();
  const [passcode, setPasscode] = useState();
  const onSubmit = () => {};

  return (
    <form onSubmit={onSubmit} className="form-container">
      <CustomInput
        label="Shop code"
        value={shopCode}
        type={"number"}
        onChange={({ target }) => setShopCode(target.value)}
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
        label="Passcode"
        value={passcode}
        type={"password"}
        onChange={({ target }) => setPasscode(target.value)}
      />
    </form>
  );
};
const CashierLogin = () => {
  const [shopCode, setShopCode] = useState();
  const [branch, setBranch] = useState();
  const [username, setUsername] = useState();
  const [passcode, setPasscode] = useState();
  const onSubmit = () => {};

  return (
    <form onSubmit={onSubmit} className="form-container">
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
    </form>
  );
};
