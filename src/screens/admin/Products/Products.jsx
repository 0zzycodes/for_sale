import React, { useState } from "react";
import ProductTable from "../../../components/admin/ProductTable/ProductTable";
import ProductTableRow from "../../../components/admin/ProductTableRow/ProductTableRow";
import ProductTopControl from "../../../components/admin/ProductTopControl/ProductTopControl";
// import { Ionicons } from "react-web-vector-icons";
import RoutePath from "../../../components/admin/RoutePath/RoutePath";
import Spacing from "../../../components/common/Spacing/Spacing";
import { DummyProducts } from "../../../constants/Products";
import "./styles.scss";
const Products = () => {
  const [query, setQuery] = useState("");
  const onChange = () => {};
  return (
    <div className="admin-dashbord-products">
      <RoutePath route="/products" />
      <ProductTopControl setQuery={setQuery} />
      <Spacing height="1em" />
      <ProductTable>
        <div className="table-data">
          {DummyProducts.map((item, index) => (
            <ProductTableRow key={index} data={item} />
          ))}
        </div>
      </ProductTable>
    </div>
  );
};

export default Products;
