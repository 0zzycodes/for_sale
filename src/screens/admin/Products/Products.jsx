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
import Spinner from "../../../components/common/Spinner/Spinner";
import { DummyProducts } from "../../../constants/Products";
import { firestore } from "../../../firebase/config";
import { setCategories } from "../../../redux/shop/actions";
import "./styles.scss";
const Products = () => {
  let onEndReachedCalled = false;
  const currentUser = useSelector(({ user }) => user.currentUser);
  const [query, setQuery] = useState("");
  const [productData, setProductData] = useState();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [type, setType] = useState(null);
  const [hasProduct, setHasProduct] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const onLoadCategories = async () => {
    const categoryRef = firestore.collection("categories");
    categoryRef.onSnapshot((snapShot) => {
      if (!snapShot.empty) {
        const categoriesArray = [];
        snapShot.forEach((item) => {
          categoriesArray.push(item.data());
        });
        dispatch(setCategories(categoriesArray));
        setLoading(false);
      }
    });
  };

  const productsRef = firestore.collection("products");
  const getProducts = async () => {
    setIsLoading(true);

    const snapshot = await productsRef.orderBy("created_at").limit(10);
    snapshot.onSnapshot((snapShot) => {
      if (!snapShot.empty) {
        setHasProduct(true);
        let newProducts = [];

        setLastDoc(snapShot.docs[snapShot.docs.length - 1]);

        for (let i = 0; i < snapShot.docs.length; i++) {
          newProducts.push(snapShot.docs[i].data());
        }
        console.log(newProducts);
        setProducts(newProducts);
      } else {
        setLastDoc(null);
      }
    });
    setIsLoading(false);
  };
  const getMore = async () => {
    if (lastDoc) {
      setIsMoreLoading(true);
      let snapshot = await productsRef
        .orderBy("created_at")
        .startAfter(lastDoc.data().created_at)
        .limit(10);
      snapshot.onSnapshot((snapShot) => {
        if (!snapShot.empty) {
          let newProducts = products;

          setLastDoc(snapShot.docs[snapShot.docs.length - 1]);

          for (let i = 0; i < snapShot.docs.length; i++) {
            newProducts.push(snapShot.docs[i].data());
          }

          setProducts(newProducts);
          if (snapShot.docs.length < 10) setLastDoc(null);
        } else {
          setLastDoc(null);
        }
      });
      setIsMoreLoading(false);
    }

    onEndReachedCalled = true;
  };
  const avProducts = () => {
    return products.length ? products : DummyProducts;
  };
  useEffect(() => {
    onLoadCategories();
    getProducts();
    return () => {};
  }, []);
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
          {isLoading ? (
            <Spinner style={{ height: "20vh" }} />
          ) : (
            products.map((item, index) => (
              <ProductTableRow
                key={index}
                data={item}
                setDialogVisible={setDialogVisible}
                setProductData={setProductData}
                setType={setType}
              />
            ))
          )}
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
