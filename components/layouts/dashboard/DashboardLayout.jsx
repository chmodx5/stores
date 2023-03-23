import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "./../../elements";
import React, { useEffect, useState } from "react";
import { useGetUserDataQuery } from "../../../store/services/api";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../../store/features/authSlice";

const DashboardLayout = ({}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const checkUserAuthStatus = useGetUserDataQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (checkUserAuthStatus.isError) {
      // localStorage.removeItem("token");
      // dispatch(setUserData({ token: null, user: null }));
      navigate("/auth/login");
    }

    if (checkUserAuthStatus.isSuccess) {
      dispatch(setUserData(checkUserAuthStatus.data.data));

      if (checkUserAuthStatus.data.data.user.store === null) {
        navigate("/create/store");
      }
    }
  }, [checkUserAuthStatus]);

  return (
    <>
      {/* layout wrapper */}
      <div className="flex h-screen">
        {/* sidebar */}
        <Sidebar user={user} mini={sidebarOpen} />
        {/* content and  navbar area */}
        <div className="flex-1 flex flex-col">
          {/* navbar */}
          {/* <header className="bg-yellow-300">
            <button onClick={() => setSidebarOpen(!sidebarOpen)}>
              toggle sidebar
            </button>
            navbar
          </header> */}
          {/* content */}
          <main className="flex-1 overflow-y-auto px-4">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
