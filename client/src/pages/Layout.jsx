import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Toggle from "../components/Toggle";

export default function Layout() {
   const [formInput, setFormInput] = useState("");

   return (
      <div>
         <div style={{ marginBottom: "2rem" }}>
            <Navbar formInput={formInput} setFormInput={setFormInput} />
            <Toggle />
            <hr />
         </div>

         <Outlet context={[formInput, setFormInput]} />
      </div>
   );
}
