import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/common/Header";

export default function RootLayout() {
  return (
    <>
      <Header />
      <main className="main dark:bg-gray-800 dark:text-gray-200">
        <Outlet />
      </main>
    </>
  );
}
