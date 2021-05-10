import React, { useState } from "react";
import { AntDesign, Ionicons } from "react-web-vector-icons";
import { v4 as uuidv4 } from "uuid";
import CustomInput from "../../common/CustomInput/CustomInput";
import CustomPopUp from "../../common/CustomPopUp/CustomPopUp";
import Spacing from "../../common/Spacing/Spacing";
import Spinner from "../../common/Spinner/Spinner";
import { useSelector } from "react-redux";
import CustomButton from "../../common/CustomButton/CustomButton";
import { GenerateRandomNDigits } from "../../../utils/helper";
import { colors } from "../../../constants/Colors";
import { CreateEmployeeProfile } from "../../../firebase/auth";

import "./styles.scss";
import { firestore } from "../../../firebase/config";
const AddEmployee = ({ setDialogVisible }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(GenerateRandomNDigits(5));
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const onReloadCode = async (e) => {
    setCode(GenerateRandomNDigits(5));
  };
  const onSubmit = async (e) => {
    const id = uuidv4().split("-").join("");
    setLoading(true);
    e.preventDefault();
    const employeeData = {
      id,
      name,
      address: location,
      phone,
      created_at: Date.now(),
      passcode: code,
      ownerId: currentUser.id,
      role: "cashier",
    };
    if (name.trim() === "" || location.trim() === "") {
      setLoading(false);
      setErrorMessage(`All fields are required!`);
      return;
    }
    const employeeRef = firestore
      .collection("employees")
      .where("phone", "==", phone);
    const snapshot = await employeeRef.get();
    if (snapshot.docs.length > 0) {
      setErrorMessage("This phone as already belong to an employee");
      setLoading(false);
      return;
    }
    try {
      await CreateEmployeeProfile(employeeData);
      setLoading(false);
      setDialogVisible(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <Spinner style={{ height: "20vh" }} />
      ) : (
        <div className="flex-center add-employee">
          <div className="flex-vertical-center add-employee-head">
            <span>New Employee</span>
            <div
              className="flex-center close-icon"
              onClick={() => setDialogVisible(false)}
            >
              <Ionicons name="md-close" size={20} color={colors.white} />
            </div>
          </div>
          <Spacing height="2em" />
          {errorMessage !== "" ? (
            <CustomPopUp
              message={`${errorMessage}`}
              type={"error"}
              customStyles={{ backgroundColor: "red" }}
              customTextStyles={{ color: "#ffffff", textAlign: "center" }}
            />
          ) : null}
          <Spacing height="1em" />
          <div className="flex-vertical-center branch-code">
            <CustomInput
              label="Passcode"
              value={code}
              type={"number"}
              disabled
              onChange={({ target }) => setCode(target.value)}
              required
            />
            <Spacing width="1em" />
            <div className="flex-center reload-icon" onClick={onReloadCode}>
              <AntDesign name="reload1" size={20} color="black" />
            </div>
          </div>
          <Spacing height="2em" />
          <CustomInput
            label="Name"
            value={name}
            type={"text"}
            onChange={({ target }) => setName(target.value)}
            required
          />
          <Spacing height="2em" />
          <CustomInput
            label="Phone Number"
            value={phone}
            type={"number"}
            onChange={({ target }) => setPhone(target.value)}
            required
          />
          <Spacing height="2em" />
          <CustomInput
            label="Address"
            value={location}
            type={"text"}
            onChange={({ target }) => setLocation(target.value)}
            required
          />
          <Spacing height="2em" />
          <CustomButton
            label="Add"
            onClick={onSubmit}
            className="add-employee-btn"
          />
        </div>
      )}
    </>
  );
};

export default AddEmployee;
