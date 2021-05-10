import React from "react";
import { useHistory } from "react-router";
import RoutePath from "../../../components/admin/RoutePath/RoutePath";

const Notifications = () => {
  const history = useHistory();
  return (
    <div className="notifications">
      <RoutePath route={history.location.pathname} goBack />
    </div>
  );
};

export default Notifications;
