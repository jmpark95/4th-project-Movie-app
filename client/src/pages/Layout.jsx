import React from "react";
import Navbar from "../components/Navbar";
import Toggle from "../components/Toggle";
import { Outlet } from "react-router-dom";

export default function Layout() {
   return (
      <div>
         <Navbar />
         <Toggle />

         <br />
         <hr />
         <br />
         <br />

         <Outlet />
         <br />
         <br />
         <br />
      </div>
   );
}
