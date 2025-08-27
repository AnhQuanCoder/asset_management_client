import React from "react";
import { Outlet } from "react-router-dom";
import "styles/index.css";

const LayoutDefault = () => {
  return (
    <>
      <Outlet />
    </>
  )
}

export default React.memo(LayoutDefault);