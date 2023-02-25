import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Toggle from "../components/Toggle";

export default function Layout() {
   const [formInput, setFormInput] = useState("");
   const [alignment, setAlignment] = useState("left");

   const handleAlignment = (event, newAlignment) => {
      if (newAlignment !== null) {
         setAlignment(newAlignment);
      }
   };

   return (
      <div>
         <div style={{ marginBottom: "2rem" }}>
            <Navbar
               formInput={formInput}
               setFormInput={setFormInput}
               setAlignment={setAlignment}
            />
            <Toggle alignment={alignment} handleAlignment={handleAlignment} />
            <hr />
         </div>

         <Outlet context={[formInput, setFormInput]} />
      </div>
   );
}
