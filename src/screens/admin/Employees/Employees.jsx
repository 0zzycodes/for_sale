import React, { useCallback, useEffect, useState } from "react";
// import { Entypo } from "react-web-vector-icons";
import { useSelector } from "react-redux";
import { Redirect, Route, useHistory } from "react-router-dom";
import RoutePath from "../../../components/admin/RoutePath/RoutePath";
import { firestore } from "../../../firebase/config";
import EmployeesOverView from "../../../components/admin/EmployeesOverView/EmployeesOverView";
// import EmployeeView from "../EmployeeView/EmployeeView";

import "./styles.scss";
const Employees = () => {
  const [hasEmployee, setHasEmployee] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const onLoadEmployees = useCallback(async () => {
    const employeeRef = firestore
      .collection("employees")
      .orderBy("name", "asc");
    employeeRef.onSnapshot((snapShot) => {
      if (!snapShot.empty) {
        setHasEmployee(true);
        const employeesArray = [];
        snapShot.forEach((item) => {
          employeesArray.push(item.data());
        });
        setEmployees(employeesArray);
        setLoading(false);
      }
    });
    setLoading(false);
  }, []);
  useEffect(() => {
    onLoadEmployees();
    return () => {};
  }, [onLoadEmployees]);
  return (
    <>
      <RoutePath route={history.location.pathname} />
      <Route
        exact
        path={`/employees`}
        render={() => (
          <EmployeesOverView
            hasEmployee={hasEmployee}
            employees={employees}
            loading={loading}
          />
        )}
      />
      {/* <Route
        exact
        path={`/employees/:employeeId`}
        render={() =>
          employee ? <EmployeeView /> : <Redirect to="/employees" />
        }
      /> */}
    </>
  );
};

export default Employees;
