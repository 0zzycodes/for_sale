import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductTopControl from "../../../components/cashier/ProductTopControl/ProductTopControl";
import RoutePath from "../../../components/admin/RoutePath/RoutePath";
import Spacing from "../../../components/common/Spacing/Spacing";
import "./styles.scss";

const CashierDashboard = () => {
  const currentUser = useSelector(({ user }) => user.currentUser);
  const [query, setQuery] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [type, setType] = useState(null);
  return (
    <div className="dashboard">
      <RoutePath route="/" />
      <ProductTopControl
        setQuery={setQuery}
        setDialogVisible={setDialogVisible}
        setType={setType}
      />
      <Spacing height="2em" />
    </div>
  );
};

export default CashierDashboard;
