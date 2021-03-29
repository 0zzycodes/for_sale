import React, { useCallback, useEffect, useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "react-web-vector-icons";
import CustomInput from "../../common/CustomInput/CustomInput";
import CustomPopUp from "../../common/CustomPopUp/CustomPopUp";
import Spacing from "../../common/Spacing/Spacing";
import Spinner from "../../common/Spinner/Spinner";
import { useSelector } from "react-redux";
import CustomButton from "../../common/CustomButton/CustomButton";

import "./styles.scss";
import { colors } from "../../../constants/Colors";
import FormSelect from "../FormSelect/FormSelect";
import { CreateProduct } from "../../../firebase/firestore";
import { firestore } from "../../../firebase/config";
import { GenerateRandomNDigits } from "../../../utils/helper";
const AddProduct = ({ setDialogVisible }) => {
  const currentUser = useSelector(({ user }) => user.currentUser);
  const categories = useSelector(({ shop }) => shop.categories);
  const [scanning, setScanning] = useState(false);
  const [selectedBracnch, setSelectedBranch] = useState({});
  const [loading, setLoading] = useState(false);
  const [barcode, setBarcode] = useState("");
  const [category, setCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cost, setCost] = useState("");
  const [profit, setProfit] = useState("");
  const [notification, setNotification] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const onScan = () => {
    setScanning(!scanning);
    const barcodeRef = firestore
      .collection("barcode")
      .doc(currentUser.id)
      .collection("codes")
      .doc("line_one");
    barcodeRef.onSnapshot((snapShot) => {
      // console.log(snapShot.data());
      if (snapShot.data()) {
        setBarcode(snapShot.data().barcode);
      }
    });
  };
  const refactorCode = useCallback(() => {
    setErrorMessage("");

    setProfit((price - cost) * quantity);
  }, [price, cost, quantity]);

  useEffect(() => {
    refactorCode();
  }, [price, cost, quantity, refactorCode]);

  const onCreateProduct = async (productData) => {
    try {
      await CreateProduct(productData, currentUser.id);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  function regenerateId() {
    checkIfProductIdExist();
  }

  async function checkIfProductIdExist(e) {
    setLoading(true);
    e.preventDefault();
    const id = GenerateRandomNDigits(5);
    if (
      productName.trim() === "" ||
      cost.trim() === "" ||
      price.trim() === "" ||
      quantity.trim() === "" ||
      notification.trim() === ""
    ) {
      setLoading(false);
      setErrorMessage(`All fields are required!`);
      return;
    }
    const productRef = await firestore
      .collection("products")
      .doc(currentUser.id)
      .collection("branch")
      .doc(selectedBracnch.id)
      .collection("products")
      .where("id", "==", `${id}`);
    const snapshot = await productRef.get();
    if (snapshot.docs.length > 0) {
      setErrorMessage(
        "Id already existed so we are trying agin with another id"
      );
      regenerateId();
      setLoading(false);
      return;
    }

    const productData = {
      id: id,
      category,
      barcode,
      product_name: productName,
      price,
      cost,
      quantity,
      profit: (price - cost) * quantity,
      notification,
      created_at: Date.now(),
      last_restock_date: Date.now(),
      last_restock_quantity: quantity,
      product_sold_since_last_restock: 0,
      archived: false,
      status: "In Stock",
    };

    onCreateProduct(productData);
  }

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
            onSubmit={(e) => checkIfProductIdExist(e)}
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
                onChange={({ target }) => {
                  setCost(target.value);
                  refactorCode();
                }}
              />
            </div>
            <Spacing height="2em" />
            <div className="flex-vertical-center inputGrouping">
              <CustomInput
                label="Price"
                value={price}
                type="number"
                onChange={({ target }) => {
                  setPrice(target.value);
                  refactorCode();
                }}
              />
              <Spacing width="2em" />
              <CustomInput
                label="Quantity"
                value={quantity}
                type="number"
                onChange={({ target }) => {
                  setQuantity(target.value);
                  refactorCode();
                }}
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
            <Spacing height="2em" />
            <FormSelect
              label="Category"
              options={categories}
              value={category}
              onChange={({ target }) => {
                console.log(target.value);
                setCategory(target.value);
              }}
            />
            <Spacing height="3em" />
            <CustomButton
              label="Add"
              onClick={(e) => checkIfProductIdExist(e)}
              className="add-product-btn"
            />
          </form>
        </div>
      )}
    </>
  );
};

export default AddProduct;
