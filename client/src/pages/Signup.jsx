import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToggleButtonContext, UserContext } from "../App";
import { Box, Button, TextField } from "@mui/material";

export default function Signup() {
   const [userName, setUserName] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const { user, setUser } = useContext(UserContext);
   const { alignment, setAlignment } = useContext(ToggleButtonContext);
   const navigate = useNavigate();

   const handleSignup = async (e) => {
      e.preventDefault();
      try {
         e.preventDefault();

         const response = await axios.post(
            `${import.meta.env.VITE_BACKEND}/auth/register`,
            {
               username: userName,
               password: password,
            }
         );

         localStorage.setItem("user", JSON.stringify(response.data));

         setUser(JSON.parse(localStorage.getItem("user")));

         navigate("/watchlist");

         setAlignment("watchlist");
      } catch {
         setError("Please enter details");
      }
   };

   return (
      <>
         <h1>Signup</h1>
         <div>{error}</div>
         <Box
            component="form"
            sx={{
               display: "flex",
               flexDirection: "column",
               gap: "1rem",
               width: { xs: "100%", sm: "50%", md: "40%" },
            }}
         >
            <TextField
               type="text"
               placeholder="Username"
               value={userName}
               onChange={(e) => setUserName(e.target.value)}
               sx={{ bgcolor: "#6d6d6d" }}
            />

            <TextField
               type="password"
               placeholder="Password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               sx={{ bgcolor: "#6d6d6d" }}
            />
            <Button
               onClick={handleSignup}
               sx={{
                  py: { xs: "0.8rem" },
                  px: { xs: "3rem", md: "4.5rem" },

                  color: "#424242",
                  bgcolor: "#e9bbaf",
                  marginRight: "auto",
                  ":hover": {
                     color: "#ffffff",
                     bgcolor: "#6d6d6d",
                  },
               }}
            >
               Signup
            </Button>
         </Box>
      </>
   );
}
