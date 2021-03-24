import React from "react";
import { useHistory } from "react-router";
import Spacing from "../../common/Spacing/Spacing";

import "./styles.scss";
const OverviewBox = ({ icon, count, label, to }) => {
  const history = useHistory();
  return (
    <div
      className="flex-vertical-center overview-box"
      onClick={() => history.push(to)}
    >
      {icon}
      <div className="overview-box-info">
        <h2 className="count">{count}</h2>
        <Spacing height="1em" />
        <h2 className="label">{label}</h2>
      </div>
    </div>
  );
};

export default OverviewBox;
