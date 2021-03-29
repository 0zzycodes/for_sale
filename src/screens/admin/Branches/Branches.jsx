import React, { useCallback, useEffect, useState } from "react";
// import { Entypo } from "react-web-vector-icons";
import { useSelector } from "react-redux";
import { Redirect, Route, useHistory } from "react-router-dom";
import RoutePath from "../../../components/admin/RoutePath/RoutePath";
import { firestore } from "../../../firebase/config";
import "./styles.scss";
import BranchesOverView from "../../../components/admin/BranchesOverView/BranchesOverView";
import BranchView from "../BranchView/BranchView";

const Branches = () => {
  const currentUser = useSelector(({ user }) => user.currentUser);
  const branch = useSelector(({ dashboard }) => dashboard.branch);
  const [hasBranch, setHasBranch] = useState(false);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
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
    <>
      <RoutePath route={history.location.pathname} />
      <Route
        exact
        path={`/branches`}
        render={() => (
          <BranchesOverView
            hasBranch={hasBranch}
            branches={branches}
            loading={loading}
          />
        )}
      />
      <Route
        exact
        path={`/branches/:branchId`}
        render={() => (branch ? <BranchView /> : <Redirect to="/branches" />)}
      />
    </>
  );
};

export default Branches;
