import React from "react";
import { useHistory, useLocation } from "react-router";
import { Ionicons } from "react-web-vector-icons";

import "./styles.scss";
const RoutePath = ({ route }) => {
  const history = useHistory();
  const location = useLocation();
  return (
    <div className="flex-center route">
      {location.pathname !== route && (
        <div
          className="flex-center arrow-back"
          onClick={() => history.goBack()}
        >
          <Ionicons name="md-arrow-back" size={20} color="black" />
        </div>
      )}
      <div className="flex-center route-path">
        <span className="route-path-link-string">{route}</span>
      </div>
    </div>
  );
};

export default RoutePath;
