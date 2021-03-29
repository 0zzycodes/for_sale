import React, { useState } from "react";
import { AntDesign, Ionicons } from "react-web-vector-icons";
import CustomInput from "../../common/CustomInput/CustomInput";
import CustomPopUp from "../../common/CustomPopUp/CustomPopUp";
import Spacing from "../../common/Spacing/Spacing";
import Spinner from "../../common/Spinner/Spinner";
import { useSelector } from "react-redux";
import CustomButton from "../../common/CustomButton/CustomButton";
import { GenerateRandomNDigits } from "../../../utils/helper";
import { colors } from "../../../constants/Colors";
import { CreateBranch } from "../../../firebase/firestore";

import "./styles.scss";
const AddBranch = ({ setDialogVisible }) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(GenerateRandomNDigits(3));
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const onReloadCode = async (e) => {
    setCode(GenerateRandomNDigits(3));
  };
  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const branchData = {
      name,
      storeName: currentUser.businessName,
      address: location,
      ownerId: currentUser.id,
      branchCode: code,
    };
    if (name.trim() === "" || location.trim() === "") {
      setLoading(false);
      setErrorMessage(`Category name is required!`);
      return;
    }
    try {
      await CreateBranch(branchData);
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
        <div className="flex-center add-category">
          <div className="flex-vertical-center add-category-head">
            <span>New Branch</span>
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
              label="Branch code"
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
            className="add-category-btn"
          />
        </div>
      )}
    </>
  );
};

export default AddBranch;
