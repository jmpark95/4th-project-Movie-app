import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Top from "./pages/Top";
import ComingSoon from "./pages/ComingSoon";
import Watchlist from "./pages/Watchlist";

const theme = createTheme({
   palette: {
      background: {
         default: "#424242",
      },
      text: {
         primary: "#ffffff",
      },

      primary: {
         light: "#6d6d6d",
         main: "#424242",
         dark: "#1b1b1b",
         contrastText: "#ffffff",
      },
      secondary: {
         light: "#ffffff",
         main: "#ffffff",
         dark: "#bdb9b9",
         contrastText: "#000000",
      },
   },
   typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      button: {
         textTransform: "none",
      },
   },
});

export default function App() {
   return (
      <ThemeProvider theme={theme}>
         <CssBaseline />
         <Container>
            <Routes>
               <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="top-rated" element={<Top />} />
                  <Route path="coming-soon" element={<ComingSoon />} />
                  <Route path="watchlist" element={<Watchlist />} />
                  <Route path="*" element={<div>404</div>} />
               </Route>
            </Routes>
         </Container>
      </ThemeProvider>
   );
}
