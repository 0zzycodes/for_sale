import React from "react";
import { Entypo, FontAwesome } from "react-web-vector-icons";
import OverviewBox from "../../../components/admin/OverviewBox/OverviewBox";
import RoutePath from "../../../components/admin/RoutePath/RoutePath";
import { colors } from "../../../constants/Colors";

import "./styles.scss";
const AdminDashboard = () => {
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
          count={0}
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
          count={0}
          to="/employees"
        />
        <OverviewBox
          label="Revenue"
          icon={<span className="icon-replacer">₦</span>}
          count={0}
          to="/revenue"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
