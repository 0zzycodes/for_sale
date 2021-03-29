import React, { useState } from "react";
import { Entypo } from "react-web-vector-icons";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import CustomButton from "../../common/CustomButton/CustomButton";
import Dialog from "../../common/Dialog/Dialog";
import Spacing from "../../common/Spacing/Spacing";
import AddBranch from "../AddBranch/AddBranch";
import Spinner from "../../common/Spinner/Spinner";

import "./styles.scss";
import { setBranch } from "../../../redux/dashboard/actions";
const BranchesOverView = ({ hasBranch, branches, loading }) => {
  const [type, setType] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  return loading ? (
    <Spinner style={{ height: "30vh" }} />
  ) : (
    <>
      {!hasBranch ? (
        <div className="flex-center-column no-data">
          <Spacing height="4em" />
          <span className="no-data-text">You have'nt added any branch yet</span>
          <Spacing height="2em" />
          <CustomButton
            label="Add Branch"
            className="add-branch-btn"
            onClick={() => {
              setType("addBranch");
              setDialogVisible(true);
            }}
          />
        </div>
      ) : (
        <div className="has-data">
          <CustomButton
            label="Add Branch"
            className="add-branch-btn absolute-btn"
            inverted
            onClick={() => {
              setType("addBranch");
              setDialogVisible(true);
            }}
          />
          <Spacing height="2em" />
          <div className="flex-vertical-center branch-list">
            {branches.map((item, index) => (
              <div
                key={index}
                className="flex-center-column branch-preview"
                onClick={() => {
                  dispatch(setBranch(item));
                  history.push(`/branches/${item.branchCode}`);
                }}
              >
                <Spacing height="1em" />
                <div className="flex-center branch-icon">
                  <Entypo name="shop" size={30} color="black" />
                </div>
                <Spacing height="1em" />
                <h3>{item.branchCode}</h3>
                <h3>{item.name}</h3>
                <h3>{item.address}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
      <Dialog dialogVisible={dialogVisible} setDialogVisible={setDialogVisible}>
        {type === "addBranch" && (
          <AddBranch setDialogVisible={setDialogVisible} />
        )}
        {/* {type === "branchView" && (
          <BranchView
            setDialogVisible={setDialogVisible}
            setBranchtData={setBranchtData}
            data={branchData}
          />
        )} */}
      </Dialog>
    </>
  );
};

export default BranchesOverView;
