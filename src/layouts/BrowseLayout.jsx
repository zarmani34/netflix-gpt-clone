import Header from "@/components/Header";
import { useUserContext } from "@/utils/UserContext";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const BrowseLayout = () => {
  const user = useUserContext()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);
  return (
    <>
      {" "}
      <Header />
      <Outlet />
    </>
  );
};

export default BrowseLayout;
