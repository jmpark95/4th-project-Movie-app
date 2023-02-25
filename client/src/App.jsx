import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Top from "./pages/Top";
import Watchlist from "./pages/Watchlist";
import Search from "./pages/Search";

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
   components: {
      MuiList: {
         styleOverrides: {
            root: {
               backgroundColor: "#6d6d6d",
               color: "white",
            },
         },
      },
      MuiCssBaseline: {
         styleOverrides: {
            body: {
               scrollbarColor: "#6b6b6b #2b2b2b",
               "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                  backgroundColor: "#2b2b2b",
               },
               "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                  borderRadius: 8,
                  backgroundColor: "#6b6b6b",
                  minHeight: 24,
                  border: "3px solid #2b2b2b",
               },
               "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
                  {
                     backgroundColor: "#959595",
                  },
               "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
                  {
                     backgroundColor: "#959595",
                  },
               "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
                  {
                     backgroundColor: "#959595",
                  },
               "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
                  backgroundColor: "#2b2b2b",
               },
            },
         },
      },
   },
});

const queryClient = new QueryClient();

export default function App() {
   return (
      <ThemeProvider theme={theme}>
         <CssBaseline />
         <QueryClientProvider client={queryClient}>
            <Container>
               <Routes>
                  <Route path="/" element={<Layout />}>
                     <Route index element={<Home />} />
                     <Route path="top-rated" element={<Top />} />
                     <Route path="watchlist" element={<Watchlist />} />
                     <Route path="search" element={<Search />}></Route>
                     <Route path="*" element={<div>404</div>} />
                  </Route>
               </Routes>
            </Container>
            <ReactQueryDevtools initialIsOpen={false} />
         </QueryClientProvider>
      </ThemeProvider>
   );
}
