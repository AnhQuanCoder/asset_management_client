import type { RootState } from "@/redux/store";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getAccountAPI } from "services/auth.service";
import { login, setAppLoading } from "@/redux/auth/authSlice";
import { PacmanLoader } from "react-spinners";

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const isAppLoading = useSelector((state: RootState) => state.auth.isAppLoading);

  React.useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await getAccountAPI();
        if (res.data) {
          dispatch(login({ user: res.data.user }));
        }
      } catch (error) {
        console.error("Not logged in:", error);
      } finally {
        dispatch(setAppLoading(false));
      }
    };

    fetchAccount();
  }, [dispatch]);

  if (isAppLoading) {
    return (
      <div style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      }}>
        <PacmanLoader size={15} color="#BF272D" />
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
