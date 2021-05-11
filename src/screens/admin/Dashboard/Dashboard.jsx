import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Entypo, FontAwesome } from "react-web-vector-icons";
import { firestore } from "../../../firebase/config";
import OverviewBox from "../../../components/admin/OverviewBox/OverviewBox";
import RoutePath from "../../../components/admin/RoutePath/RoutePath";
import { colors } from "../../../constants/Colors";

import "./styles.scss";
const AdminDashboard = () => {
  const user = useSelector(({ user }) => user.currentUser);
  const hasNoty = useSelector(({ user }) => user.hasNoty);
  const [filter, setFilter] = useState("thisWeek");
  const [productCount, setProductCount] = useState("0");
  const [cashierCount, setCashierCount] = useState("0");
  const [latestSale, setLatestSale] = useState([]);
  const [revenue, setRevenue] = useState("0");
  const [isTransactionLoading, setIsTransactionLoading] = useState(true);
  const [isProductLoading, setIsProductLoading] = useState(true);
  const [isCashierLoading, setIsCashierLoading] = useState(true);
  const [isStatsLoading, setIsStatsLoading] = useState(true);
  const dispatch = useDispatch();
  const productsRef = firestore.collection("products");
  const cashiersRef = firestore.collection("employees");
  const statsRef = firestore.collection("stats").doc(user.id);
  const latestSalesRef = firestore.collection("sales");
  const fetchData = async () => {
    productsRef.onSnapshot((snapShot) => {
      setProductCount(snapShot.size);
      setIsProductLoading(false);
    });

    cashiersRef.onSnapshot((snapShot) => {
      setCashierCount(snapShot.size);
      setIsCashierLoading(false);
    });

    statsRef.onSnapshot((snapShot) => {
      if (!snapShot.exists) {
        setIsStatsLoading(false);
        return;
      }
      setRevenue(snapShot.data().revenue);
      setIsStatsLoading(false);
    });
    latestSalesRef
      .orderBy("created_at", "desc")
      .limit(3)
      .onSnapshot((snapShot) => {
        const salesArr = [];
        if (!snapShot.empty) {
          const size = snapShot.docs.length - 1;
          snapShot.docs.forEach((item, index) => {
            salesArr.push(item.data());
            if (index === size) {
              setLatestSale(salesArr);
              setIsTransactionLoading(false);
            }
          });
          return;
        }
        setIsTransactionLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, [""]);

  return (
    <div className="admin-dashboard">
      <RoutePath route="/" />
      <div className="flex-vertical-center overview">
        <OverviewBox
          label="Products"
          icon={
            <Entypo
              name="box"
              size={30}
              color={colors.white}
              className={`overview-box-icon`}
            />
          }
          count={productCount}
          to="/products"
        />
        <OverviewBox
          label="Eployees"
          icon={
            <FontAwesome
              name="users"
              size={30}
              color={colors.black}
              className={`overview-box-icon`}
            />
          }
          count={cashierCount}
          to="/employees"
        />
        <OverviewBox
          label="Revenue"
          icon={<span className="icon-replacer">₦</span>}
          count={revenue}
          to="/revenue"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
