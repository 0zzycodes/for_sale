import React from "react";
import { useHistory } from "react-router";
import { Ionicons } from "react-web-vector-icons";

import "./styles.scss";
const RoutePath = ({ route, goBack }) => {
  const history = useHistory();
  return (
    <div className="flex-center route">
      {route.split("/").length > 2 || goBack ? (
        <div
          className="flex-center arrow-back"
          onClick={() => history.goBack()}
        >
          <Ionicons name="md-arrow-back" size={20} color="black" />
        </div>
      ) : null}
      <div className="flex-center route-path">
        <span className="route-path-link-string">{route}</span>
      </div>
    </div>
  );
};

export default RoutePath;
