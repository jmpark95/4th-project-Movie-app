import React from "react";
import Navbar from "./Navbar";
import Toggle from "./Toggle";
import { Outlet } from "react-router-dom";

export default function Layout() {
   return (
      <div>
         <Navbar />
         <Toggle />

         <hr />

         <Outlet />
      </div>
   );
}
