import React from "react";

import "./styles.scss";
const ProductTable = ({ children }) => {
  return (
    <div className="product-table">
      <div className="flex-vertical-center product-tabel-head">
        <h4 className="product-tabel-head-text product-name">Product name</h4>
        <h4 className="product-tabel-head-text code">Barcode</h4>
        <h4 className="product-tabel-head-text category">Category</h4>
        <h4 className="product-tabel-head-text quantity">Quantity</h4>
        <h4 className="product-tabel-head-text cost">Cost</h4>
        <h4 className="product-tabel-head-text price">Price</h4>
        <h4 className="product-tabel-head-text status">Status</h4>
        <h4 className="product-tabel-head-text actions">Actions</h4>
      </div>
      {children}
    </div>
  );
};

export default ProductTable;
