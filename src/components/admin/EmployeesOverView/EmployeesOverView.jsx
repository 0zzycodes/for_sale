import React, { useState } from "react";
import { FontAwesome } from "react-web-vector-icons";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import CustomButton from "../../common/CustomButton/CustomButton";
import Dialog from "../../common/Dialog/Dialog";
import Spacing from "../../common/Spacing/Spacing";
import AddEmployee from "../AddEmployee/AddEmployee";
import Spinner from "../../common/Spinner/Spinner";

import "./styles.scss";
import { setEmployee } from "../../../redux/shop/actions";
const EmployeesOverView = ({ hasEmployee, employees, loading }) => {
  const [type, setType] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  return loading ? (
    <Spinner style={{ height: "30vh" }} />
  ) : (
    <>
      {!hasEmployee ? (
        <div className="flex-center-column no-data">
          <Spacing height="4em" />
          <span className="no-data-text">
            You have'nt added any Employee yet
          </span>
          <Spacing height="2em" />
          <CustomButton
            label="Add Employee"
            className="add-employee-btn"
            onClick={() => {
              setType("addEmployee");
              setDialogVisible(true);
            }}
          />
        </div>
      ) : (
        <div className="has-data">
          <CustomButton
            label="Add Employee"
            className="add-employee-btn absolute-btn"
            inverted
            onClick={() => {
              setType("addEmployee");
              setDialogVisible(true);
            }}
          />
          <Spacing height="2em" />
          <div className="flex-vertical-center employee-list">
            {employees.map((item, index) => (
              <div
                key={index}
                className="flex-center-column employee-preview"
                onClick={() => {
                  dispatch(setEmployee(item));
                  history.push(`/employees/${item.employeeCode}`);
                }}
              >
                <Spacing height="1em" />
                <div className="flex-center employee-icon">
                  <FontAwesome name="user" size={30} color="black" />
                  {/* <FontAwesome name="shop" size={30} color="black" /> */}
                </div>
                <Spacing height="1em" />
                <h3>{item.name}</h3>
                <h3>{item.phone}</h3>
                <h3>{item.address}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
      <Dialog dialogVisible={dialogVisible} setDialogVisible={setDialogVisible}>
        {type === "addEmployee" && (
          <AddEmployee setDialogVisible={setDialogVisible} />
        )}
        {/* {type === "EmployeeView" && (
          <EmployeeView
            setDialogVisible={setDialogVisible}
            setEmployeetData={setEmployeetData}
            data={EmployeeData}
          />
        )} */}
      </Dialog>
    </>
  );
};

export default EmployeesOverView;
