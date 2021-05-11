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
const ProductView = ({
  setDialogVisible,
  setProductData,
  data,
  data: { category, id },
}) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [restocking, setRestocking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [barcode, setBarcode] = useState(data.barcode);
  const [productName, setProductName] = useState(data.product_name);
  const [price, setPrice] = useState(data.price);
  const [quantity, setQuantity] = useState(data.quantity);
  const [cost, setCost] = useState(data.cost);
  const [profit, setProfit] = useState(data.profit);
  const [notification, setNotification] = useState(data.notification);
  const [errorMessage, setErrorMessage] = useState("");
  const onCloseView = () => {
    setDialogVisible(false);
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
        <div className="product-view-wrapper">
          <div className="flex-vertical-center product-view-head">
            <span>
              #{barcode || id} &mdash;{" "}
              <span
                className={`${
                  quantity > notification
                    ? "in-stock"
                    : quantity < notification
                    ? "running-low"
                    : "out-of-stock"
                }`}
              >
                {quantity > notification
                  ? "In-stock"
                  : quantity < notification
                  ? "Running-low"
                  : "Out-of-stock"}
              </span>
            </span>
            <div className="flex-center close-icon" onClick={onCloseView}>
              <Ionicons name="md-close" size={20} color={colors.white} />
            </div>
          </div>
          <Spacing height="3em" />
          <form
            onSubmit={(e) => onSubmit(e)}
            className="product-view-form-container"
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
                onChange={({ target }) => setBarcode(target.value)}
              />
              <Spacing width="1em" />
              <div className="flex-center barcode-icon">
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
                disabled
                onChange={({ target }) => setProductName(target.value)}
              />
              <Spacing width="2em" />
              <CustomInput
                label="Cost"
                value={cost}
                type="number"
                disabled={!restocking}
                onChange={({ target }) => setCost(target.value)}
              />
            </div>
            <Spacing height="2em" />
            <div className="flex-vertical-center inputGrouping">
              <CustomInput
                label="Price"
                value={price}
                type="number"
                disabled={!restocking}
                onChange={({ target }) => setPrice(target.value)}
              />
              <Spacing width="2em" />
              <CustomInput
                label="Quantity"
                value={quantity}
                type="number"
                disabled={!restocking}
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
                disabled={!restocking}
                onChange={({ target }) => setNotification(target.value)}
              />
            </div>
            <Spacing height="3em" />
            <CustomButton
              label="Restock"
              onClick={(e) => {
                e.preventDefault();
                setRestocking(true);
              }}
              className="product-view-btn"
            />
          </form>
        </div>
      )}
    </>
  );
};

export default ProductView;
