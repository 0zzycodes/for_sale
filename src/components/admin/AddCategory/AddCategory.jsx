import React, { useState } from "react";
import { Ionicons } from "react-web-vector-icons";
import CustomInput from "../../common/CustomInput/CustomInput";
import CustomPopUp from "../../common/CustomPopUp/CustomPopUp";
import Spacing from "../../common/Spacing/Spacing";
import Spinner from "../../common/Spinner/Spinner";
import { useSelector } from "react-redux";
import CustomButton from "../../common/CustomButton/CustomButton";

import "./styles.scss";
import { colors } from "../../../constants/Colors";
const AddCategory = ({ setDialogVisible }) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (category.trim() === "") {
      setLoading(false);
      setErrorMessage(`Category name is required!`);
      return;
    }
    try {
      setLoading(false);
    } catch (error) {
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
            <span>New Category</span>
            <div
              className="flex-center close-icon"
              onClick={() => setDialogVisible(false)}
            >
              <Ionicons name="md-close" size={20} color={colors.white} />
            </div>
          </div>
          {errorMessage !== "" ? (
            <CustomPopUp
              message={`${errorMessage}`}
              type={"error"}
              customStyles={{ backgroundColor: "red" }}
              customTextStyles={{ color: "#ffffff", textAlign: "center" }}
            />
          ) : null}
          <Spacing height="1em" />

          <CustomInput
            value={category}
            type={"text"}
            placeholder="Enter new category"
            onChange={({ target }) => setCategory(target.value)}
            required
          />
          <Spacing height="2em" />
          <CustomButton
            label="Add"
            onClick={() => {}}
            className="add-category-btn"
          />
        </div>
      )}
    </>
  );
};

export default AddCategory;
