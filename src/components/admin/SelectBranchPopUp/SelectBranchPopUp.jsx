import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Entypo } from "react-web-vector-icons";
import { firestore } from "../../../firebase/config";
import CustomButton from "../../common/CustomButton/CustomButton";
import Spacing from "../../common/Spacing/Spacing";
import Spinner from "../../common/Spinner/Spinner";

import "./styles.scss";
const SelectBranchPopUp = ({ popUpVisible, setPopUpVisible, style }) => {
  const currentUser = useSelector(({ user }) => user.currentUser);
  const [hasBranch, setHasBranch] = useState(false);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const onLoadBranches = useCallback(async () => {
    const branchRef = firestore
      .collection("stores")
      .doc(currentUser.id)
      .collection("branches")
      .orderBy("name", "asc");
    branchRef.onSnapshot((snapShot) => {
      if (!snapShot.empty) {
        setHasBranch(true);
        const branchesArray = [];
        snapShot.forEach((item) => {
          branchesArray.push(item.data());
        });
        setBranches(branchesArray);
        setLoading(false);
      }
    });
  }, [currentUser.id]);
  useEffect(() => {
    onLoadBranches();
    return () => {};
  }, [onLoadBranches]);
  return (
    popUpVisible && (
      <div
        id="popup-wrapper"
        className={`popup-container ${popUpVisible ? "show" : ""}`}
        style={style}
      >
        {loading ? (
          <Spinner style={{ height: "30vh" }} />
        ) : !hasBranch ? (
          <div className="flex-center-column no-data">
            <Spacing height="4em" />
            <span className="no-data-text">
              You have'nt added any branch yet
            </span>
            <Spacing height="2em" />
            <CustomButton
              label="Add Branch"
              className="add-branch-btn"
              onClick={() => {
                setPopUpVisible(true);
              }}
            />
          </div>
        ) : (
          <div className="flex-vertical-center branch-list">
            {branches.map((item, index) => (
              <div
                key={index}
                className="flex-center-column branch-preview"
                onClick={() => {}}
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
        )}
      </div>
    )
  );
};

export default SelectBranchPopUp;
