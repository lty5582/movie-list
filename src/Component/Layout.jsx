import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

function Layout({ setSearchResults, searchResults }) {
  return (
    <>
      <NavBar setSearchResults={setSearchResults} searchResults={searchResults}/>
      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;