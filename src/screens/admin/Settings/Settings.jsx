import React from "react";
import { useHistory } from "react-router";
import RoutePath from "../../../components/admin/RoutePath/RoutePath";

const Settings = () => {
  const history = useHistory();
  return (
    <div>
      <RoutePath route={history.location.pathname} goBack />
    </div>
  );
};

export default Settings;
