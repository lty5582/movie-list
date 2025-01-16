import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

function Layout() {
  return (
    <>
      <NavBar />
      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;