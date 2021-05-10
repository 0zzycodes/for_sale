import React, { useCallback, useEffect, useState } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./redux/user/actions";
import { auth } from "./firebase/config";
import { createShopAdminProfile } from "./firebase/auth";

// COMPONENTS
import Spinner from "./components/common/Spinner/Spinner";

// PAGES
import AdminDashboard from "./screens/admin/Dashboard/Dashboard";
import CashierDashboard from "./screens/cashier/Dashboard/Dashboard";
import Login from "./screens/common/Login/Login";
import NotFound from "./screens/common/NotFound/NotFound";
import MakeSale from "./screens/cashier/MakeSale/MakeSale";

// STYLES
import "./App.scss";
import AuthLayout from "./components/common/Layout/Layout";
import DashboardLayout from "./components/admin/DashboardLayout/Layout";
import CashierDashboardLayout from "./components/cashier/Layout/Layout";
import Reports from "./screens/admin/Reports/Reports";
import Products from "./screens/admin/Products/Products";
import Employees from "./screens/admin/Employees/Employees";
import Notifications from "./screens/admin/Notifications/Notifications";
import Settings from "./screens/admin/Settings/Settings";

const App = () => {
  const currentUser = useSelector(({ user }) => user.currentUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const checkUser = useCallback(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        try {
          const userRef = await createShopAdminProfile(userAuth);
          userRef.onSnapshot((snapShot) => {
            const data = { id: snapShot.id, ...snapShot.data() };
            dispatch(setCurrentUser(data));
            data.emailVerified === false &&
              userAuth.emailVerified === true &&
              snapShot.ref.update({ emailVerified: true });
            setLoading(false);
          });
        } catch (error) {
          setLoading(false);
          console.log("catch");
          console.log("here", error.message);
        }
      } else {
        setLoading(false);
      }
    });
  }, [dispatch]);
  useEffect(() => {
    checkUser();
    if (!JSON.parse(sessionStorage.getItem("reauthenticate"))) {
      sessionStorage.setItem(
        "reauthenticate",
        JSON.stringify({ status: false })
      );
    }
  }, [checkUser, dispatch]);

  return loading ? (
    <Spinner />
  ) : (
    <Switch>
      <Route
        exact
        path="/"
        render={() => {
          if (currentUser) {
            return currentUser && currentUser.role === "admin" ? (
              <DashboardLayout>
                <AdminDashboard />
              </DashboardLayout>
            ) : currentUser && currentUser.role === "cashier" ? (
              <CashierDashboardLayout>
                <CashierDashboard />
              </CashierDashboardLayout>
            ) : (
              <Redirect to={`/login`} />
            );
          } else {
            return <Redirect to={`/login`} />;
          }
        }}
      />
      <Route
        path="/login"
        render={() =>
          currentUser ? (
            <Redirect to={`/`} />
          ) : (
            <AuthLayout>
              <Login />
            </AuthLayout>
          )
        }
      />
      <Route
        path="/products"
        render={() =>
          !currentUser ? (
            <Redirect to={`/login`} />
          ) : (
            <DashboardLayout>
              <Products />
            </DashboardLayout>
          )
        }
      />
      <Route
        path="/employees"
        render={() =>
          !currentUser ? (
            <Redirect to={`/login`} />
          ) : (
            <DashboardLayout>
              <Employees />
            </DashboardLayout>
          )
        }
      />
      <Route
        exact
        path={`/make-sale`}
        render={() =>
          !currentUser ? (
            <Redirect to={`/login`} />
          ) : (
            currentUser.role === "cashier" && (
              <CashierDashboardLayout>
                <MakeSale />
              </CashierDashboardLayout>
            )
          )
        }
      />
      <Route
        path="/reports"
        render={() =>
          !currentUser ? (
            <Redirect to={`/login`} />
          ) : (
            <DashboardLayout>
              <Reports />
            </DashboardLayout>
          )
        }
      />
      <Route
        path="/settings"
        render={() =>
          !currentUser ? (
            <Redirect to={`/login`} />
          ) : (
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          )
        }
      />
      <Route
        path="/notifications"
        render={() =>
          !currentUser ? (
            <Redirect to={`/login`} />
          ) : (
            <DashboardLayout>
              <Notifications />
            </DashboardLayout>
          )
        }
      />
      <Route
        render={() => (
          <AuthLayout notfound>
            <NotFound />
          </AuthLayout>
        )}
      />
    </Switch>
  );
};

export default withRouter(App);
