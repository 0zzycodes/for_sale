import React from "react";
import { AntDesign, Feather } from "react-web-vector-icons";
import { useSelector } from "react-redux";

import "./styles.scss";
import { colors } from "../../../constants/Colors";
import Spacing from "../../../components/common/Spacing/Spacing";
const BranchView = () => {
  //   const currentUser = useSelector(({ user }) => user.currentUser);
  const branch = useSelector(({ dashboard }) => dashboard.branch);

  return (
    <div className="branch-view">
      <div className="flex-vertical-center branch-view-head">
        <div className="branch-view-head-info">
          <h3 className="branch-name">{branch.name}</h3>
          <h4 className="branch-address">{branch.address}</h4>
        </div>
        <div className="flex-vertical-center branch-view-head-controls">
          <div className="flex-center branch-view-head-control-icon">
            <Feather name="edit-3" size={20} color={colors.black} />
          </div>
          <Spacing width="1em" />
          <div className="flex-center branch-view-head-control-icon">
            <AntDesign name="delete" size={20} color={colors.danger} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchView;
