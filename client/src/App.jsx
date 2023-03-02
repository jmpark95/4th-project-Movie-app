import { Routes, Route, Navigate } from "react-router-dom";
import { createContext, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";
import { theme } from "./theme";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Top from "./pages/Top";
import Watchlist from "./pages/Watchlist";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LoginRequired from "./pages/LoginRequired";

export const UserContext = createContext({
   user: JSON.parse(localStorage.getItem("user")),
   setUser: () => {},
});

export const ToggleButtonContext = createContext({
   alignment: "now-playing",
   setAlignment: () => {},
});

export default function App() {
   const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
   const [alignment, setAlignment] = useState("now-playing");

   const userValue = { user, setUser };
   const alignmentValue = { alignment, setAlignment };

   return (
      <ThemeProvider theme={theme}>
         <CssBaseline />
         <UserContext.Provider value={userValue}>
            <ToggleButtonContext.Provider value={alignmentValue}>
               <Container>
                  <Routes>
                     <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="top-rated" element={<Top />} />
                        <Route
                           path="watchlist"
                           element={
                              user ? (
                                 <Watchlist />
                              ) : (
                                 <Navigate to="/login-required" />
                              )
                           }
                        />
                        <Route
                           path="login-required"
                           element={<LoginRequired />}
                        ></Route>
                        <Route path="search" element={<Search />}></Route>
                        <Route path="login" element={<Login />}></Route>
                        <Route path="signup" element={<Signup />}></Route>
                        <Route path="*" element={<div>404</div>} />
                     </Route>
                  </Routes>
               </Container>
            </ToggleButtonContext.Provider>
         </UserContext.Provider>
      </ThemeProvider>
   );
}
