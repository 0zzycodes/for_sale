import React, { useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "react-web-vector-icons";
import CustomInput from "../../common/CustomInput/CustomInput";
import CustomPopUp from "../../common/CustomPopUp/CustomPopUp";
import Spacing from "../../common/Spacing/Spacing";
import Spinner from "../../common/Spinner/Spinner";
import { useSelector } from "react-redux";
import CustomButton from "../../common/CustomButton/CustomButton";

import "./styles.scss";
import { colors } from "../../../constants/Colors";
const AddProduct = ({ setDialogVisible }) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [scanning, setScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [barcode, setBarcode] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cost, setCost] = useState("");
  const [profit, setProfit] = useState("");
  const [notification, setNotification] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const onScan = () => {
    setScanning(!scanning);
  };
  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (
      barcode.trim() === "" ||
      productName.trim() === "" ||
      cost.trim() === "" ||
      price.trim() === "" ||
      quantity.trim() === "" ||
      profit.trim() === "" ||
      notification.trim() === ""
    ) {
      setLoading(false);
      setErrorMessage(`All fields are required!`);
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
        <div className="add-product-wrapper">
          <div className="flex-vertical-center add-product-head">
            <span>New Product</span>
            <div
              className="flex-center close-icon"
              onClick={() => setDialogVisible(false)}
            >
              <Ionicons name="md-close" size={20} color={colors.white} />
            </div>
          </div>
          <Spacing height="3em" />
          <form
            onSubmit={(e) => onSubmit(e)}
            className="add-product-form-container"
          >
            {errorMessage !== "" ? (
              <CustomPopUp
                message={`${errorMessage}`}
                type={"error"}
                customStyles={{ backgroundColor: "red" }}
                customTextStyles={{ color: "#ffffff", textAlign: "center" }}
              />
            ) : null}
            <div className="flex-vertical-center barcode">
              <CustomInput
                label="Barcode"
                value={barcode}
                type="number"
                disabled
                placeholder={scanning && "Scanning..."}
                onChange={({ target }) => setBarcode(target.value)}
              />
              <Spacing width="1em" />
              <div className="flex-center barcode-icon" onClick={onScan}>
                <MaterialCommunityIcons
                  name="barcode-scan"
                  size={24}
                  color="black"
                />
              </div>
            </div>
            <Spacing height="2em" />
            <div className="flex-vertical-center inputGrouping-alt">
              <CustomInput
                label="Product name"
                value={productName}
                type="text"
                onChange={({ target }) => setProductName(target.value)}
              />
              <Spacing width="2em" />
              <CustomInput
                label="Cost"
                value={cost}
                type="number"
                onChange={({ target }) => setCost(target.value)}
              />
            </div>
            <Spacing height="2em" />
            <div className="flex-vertical-center inputGrouping">
              <CustomInput
                label="Price"
                value={price}
                type="number"
                onChange={({ target }) => setPrice(target.value)}
              />
              <Spacing width="2em" />
              <CustomInput
                label="Quantity"
                value={quantity}
                type="number"
                onChange={({ target }) => setQuantity(target.value)}
              />
            </div>
            <Spacing height="2em" />

            <div className="flex-vertical-center inputGrouping">
              <CustomInput
                label="Profit"
                value={profit}
                type="number"
                disabled
                onChange={({ target }) => setProfit(target.value)}
              />
              <Spacing width="2em" />
              <CustomInput
                label="Notification"
                value={notification}
                type="number"
                onChange={({ target }) => setNotification(target.value)}
              />
            </div>
            <Spacing height="3em" />
            <CustomButton
              label="Add"
              onClick={(e) => onSubmit(e)}
              className="add-product-btn"
            />
          </form>
        </div>
      )}
    </>
  );
};

export default AddProduct;
