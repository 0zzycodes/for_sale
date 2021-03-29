import React, { useCallback, useEffect, useState } from "react";
import { AntDesign, Ionicons } from "react-web-vector-icons";
import CustomInput from "../../common/CustomInput/CustomInput";
import CustomPopUp from "../../common/CustomPopUp/CustomPopUp";
import Spacing from "../../common/Spacing/Spacing";
import Spinner from "../../common/Spinner/Spinner";
import { useSelector } from "react-redux";
import CustomButton from "../../common/CustomButton/CustomButton";

import "./styles.scss";
import { colors } from "../../../constants/Colors";
import { GenerateRandomNDigits } from "../../../utils/helper";
import { CreateCategory } from "../../../firebase/firestore";
const AddCategory = ({ setDialogVisible }) => {
  const currentUser = useSelector(({ user }) => user.currentUser);
  const [randomDigits, setRandomDigits] = useState(GenerateRandomNDigits(2));
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(randomDigits);
  const [category, setCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const onReloadCode = async (e) => {
    setRandomDigits(GenerateRandomNDigits(2));
  };
  const onSubmit = async () => {
    setLoading(true);
    if (category.trim() === "") {
      setLoading(false);
      setErrorMessage(`Category name is required!`);
      return;
    }
    try {
      await CreateCategory({ ownerId: currentUser.id, category, id: code });
      setLoading(false);
      setDialogVisible(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const getAcronym = useCallback(() => {
    if (category) {
      const matches = category.match(/\b(\w)/g);
      return matches.join("");
    }
    return "";
  }, [category]);
  const refactorCode = useCallback(() => {
    setErrorMessage("");
    const acronym = getAcronym().toUpperCase();
    setCode(`${acronym}${randomDigits}`);
  }, [getAcronym, randomDigits]);

  useEffect(() => {
    refactorCode();
  }, [category, randomDigits, refactorCode]);
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
              customStyles={{
                backgroundColor: "red",
                width: "100%",
                padding: ".6em 2em",
                marginTop: "2em",
              }}
              customTextStyles={{
                color: "#ffffff",
                textAlign: "center",
                fontSize: "1.2em",
              }}
            />
          ) : null}
          <Spacing height="2em" />
          <div className="flex-vertical-center category-code">
            <CustomInput
              label="Category code"
              value={code}
              type={"text"}
              disabled
              onChange={({ target }) => setCode(target.value)}
              required
            />
            <Spacing width="1em" />
            <div
              className="flex-center reload-icon"
              onClick={() => {
                onReloadCode();
                refactorCode();
              }}
            >
              <AntDesign name="reload1" size={20} color="black" />
            </div>
          </div>
          <Spacing height="2em" />
          <CustomInput
            value={category}
            type={"text"}
            placeholder="Enter new category"
            onChange={({ target }) => {
              setCategory(target.value);
              refactorCode();
            }}
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

export default AddCategory;
