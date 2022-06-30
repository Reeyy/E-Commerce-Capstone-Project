import React from "react";
import { Outlet } from "react-router-dom";
import Directory from "../../components/directory/directory.component";
import categories from "../../data/categories.json";
export const Home = () => {
  return (
    <div>
      <Outlet />
      <Directory categories={categories} />{" "}
    </div>
  );
};
