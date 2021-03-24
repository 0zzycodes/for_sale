import React from "react";
import { Ionicons } from "react-web-vector-icons";
import CustomButton from "../../common/CustomButton/CustomButton";
import Spacing from "../../common/Spacing/Spacing";

import "./styles.scss";
const ProductTopControl = ({ setQuery }) => {
  return (
    <div className="flex-vertical-center products-top-control">
      <div className="flex-vertical-center products-top-controls-search">
        <div className="flex-center product-search-icon">
          <Ionicons name="md-search" size={24} color="black" />
        </div>
        <Spacing width="1em" />
        <input
          type="text"
          placeholder="Search product"
          onChange={({ target }) => setQuery(target.value)}
          className="product-search-input"
        />
      </div>
      <div className="flex-vertical-center products-top-controls-buttons">
        <CustomButton
          label="Add Category"
          inverted
          className="products-top-controls-button"
        />
        <Spacing width="1em" />
        <CustomButton
          label="Add Product"
          className="products-top-controls-button"
        />
      </div>
    </div>
  );
};

export default ProductTopControl;
