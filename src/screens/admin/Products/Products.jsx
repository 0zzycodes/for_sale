import React, { useState } from "react";
import AddCategory from "../../../components/admin/AddCategory/AddCategory";
import AddProduct from "../../../components/admin/AddProduct/AddProduct";
import ProductTable from "../../../components/admin/ProductTable/ProductTable";
import ProductTableRow from "../../../components/admin/ProductTableRow/ProductTableRow";
import ProductTopControl from "../../../components/admin/ProductTopControl/ProductTopControl";
import ProductView from "../../../components/admin/ProductView/ProductView";
// import { Ionicons } from "react-web-vector-icons";
import RoutePath from "../../../components/admin/RoutePath/RoutePath";
import CustomButton from "../../../components/common/CustomButton/CustomButton";
import CustomInput from "../../../components/common/CustomInput/CustomInput";
import Dialog from "../../../components/common/Dialog/Dialog";
import Spacing from "../../../components/common/Spacing/Spacing";
import { DummyProducts } from "../../../constants/Products";
import "./styles.scss";
const Products = () => {
  const [query, setQuery] = useState("");
  const [productData, setProductData] = useState();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [type, setType] = useState(null);
  return (
    <div className="admin-dashbord-products">
      <RoutePath route="/products" />
      <ProductTopControl
        setQuery={setQuery}
        setDialogVisible={setDialogVisible}
        setType={setType}
      />
      <Spacing height="2em" />
      <ProductTable>
        <div className="table-data">
          {DummyProducts.map((item, index) => (
            <ProductTableRow
              key={index}
              data={item}
              setDialogVisible={setDialogVisible}
              setProductData={setProductData}
              setType={setType}
            />
          ))}
        </div>
      </ProductTable>
      <Dialog dialogVisible={dialogVisible} setDialogVisible={setDialogVisible}>
        {type === "category" && (
          <AddCategory setDialogVisible={setDialogVisible} />
        )}
        {type === "product" && (
          <AddProduct setDialogVisible={setDialogVisible} />
        )}
        {type === "productView" && (
          <ProductView
            setDialogVisible={setDialogVisible}
            setProductData={setProductData}
            data={productData}
          />
        )}
      </Dialog>
    </div>
  );
};

export default Products;
