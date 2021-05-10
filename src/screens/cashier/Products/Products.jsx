import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCategory from "../../../components/admin/AddCategory/AddCategory";
import AddProduct from "../../../components/admin/AddProduct/AddProduct";
import ProductTable from "../../../components/admin/ProductTable/ProductTable";
import ProductTableRow from "../../../components/admin/ProductTableRow/ProductTableRow";
import ProductTopControl from "../../../components/admin/ProductTopControl/ProductTopControl";
import ProductView from "../../../components/admin/ProductView/ProductView";
// import { Ionicons } from "react-web-vector-icons";
import RoutePath from "../../../components/admin/RoutePath/RoutePath";
import Dialog from "../../../components/common/Dialog/Dialog";
import Spacing from "../../../components/common/Spacing/Spacing";
import { DummyProducts } from "../../../constants/Products";
import "./styles.scss";
const Products = () => {
  const currentUser = useSelector(({ user }) => user.currentUser);
  const [query, setQuery] = useState("");
  const [productData, setProductData] = useState();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [type, setType] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const onLoadCategories = useCallback(async () => {}, []);
  useEffect(() => {
    onLoadCategories();
    return () => {};
  }, [onLoadCategories]);
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
