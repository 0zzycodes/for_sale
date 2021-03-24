import React from "react";
import { Feather, MaterialIcons } from "react-web-vector-icons";
import Spacing from "../../common/Spacing/Spacing";

import "./styles.scss";
const ProductTableRow = ({
  data: { name, barcode, category, quantity, cost, price, status },
}) => {
  return (
    <div className="flex-vertical-center product-table-row">
      <span className="product-table-row-text product-name">{name}</span>
      <span className="product-table-row-text code">{barcode}</span>
      <span className="product-table-row-text category">{category}</span>
      <span className="product-table-row-text quantity">{quantity}</span>
      <span className="product-table-row-text cost">{cost}</span>
      <span className="product-table-row-text price">{price}</span>
      <span className="product-table-row-text status">{status}</span>
      <div className="actions">
        <div className="flex-center action-icon">
          <Feather name="edit-3" size={20} color="black" />
        </div>
        <Spacing width="1em" />
        <div className="flex-center action-icon">
          <MaterialIcons name="archive" size={22} color="black" />
        </div>
      </div>
    </div>
  );
};

export default ProductTableRow;
