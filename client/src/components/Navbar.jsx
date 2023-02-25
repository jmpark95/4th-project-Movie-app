import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import {
   AppBar,
   Box,
   Toolbar,
   IconButton,
   Typography,
   InputBase,
   MenuItem,
   Menu,
   Link,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import VideocamIcon from "@mui/icons-material/Videocam";

const Search = styled("div")(({ theme }) => ({
   position: "relative",
   borderRadius: "5px",
   backgroundColor: alpha(theme.palette.common.white, 0.15),
   "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
   },
   marginRight: theme.spacing(2),
   marginLeft: 0,
   width: "100%",
   [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
   },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
   padding: theme.spacing(0, 2),
   height: "100%",
   position: "absolute",
   pointerEvents: "none",
   display: "flex",
   alignItems: "center",
   justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
   color: "inherit",
   "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
         width: "40ch",
      },
   },
}));

export default function Navbar({ formInput, setFormInput, setAlignment }) {
   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
   const navigate = useNavigate();

   const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
   };

   const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      navigate("/search");
      setAlignment("");
   };

   const mobileMenuId = "primary-search-account-menu-mobile";
   const renderMobileMenu = (
      <Menu
         anchorEl={mobileMoreAnchorEl}
         anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
         }}
         id={mobileMenuId}
         keepMounted
         transformOrigin={{
            vertical: "top",
            horizontal: "right",
         }}
         open={isMobileMenuOpen}
         onClose={handleMobileMenuClose}
         sx={{ color: "pink" }}
      >
         <MenuItem>Login</MenuItem>
         <MenuItem>Signup</MenuItem>
      </Menu>
   );

   return (
      <Box sx={{ flexGrow: 1, marginTop: 1 }}>
         <AppBar position="static" elevation={0}>
            <Toolbar
               disableGutters
               sx={{
                  width: "100%",
                  maxWidth: 1200,
                  mx: "auto",
               }}
            >
               <IconButton
                  aria-label="logo"
                  sx={{ padding: 0, mr: 1, color: "#e9bbaf" }}
                  disableRipple={true}
                  href="/"
                  color="inherit"
               >
                  <VideocamIcon
                     style={{ fontSize: 38, marginRight: "0.3rem" }}
                  />
                  <Typography
                     variant="h5"
                     noWrap
                     component="div"
                     paddingTop="3px"
                     sx={{
                        display: { xs: "none", sm: "block" },
                     }}
                  >
                     MovieBrowser
                  </Typography>
               </IconButton>

               <form onSubmit={handleSubmit}>
                  <Search>
                     <SearchIconWrapper>
                        <SearchIcon />
                     </SearchIconWrapper>
                     <StyledInputBase
                        placeholder="Search movie…"
                        inputProps={{ "aria-label": "search" }}
                        value={formInput}
                        onChange={(e) => setFormInput(e.target.value)}
                     />
                  </Search>
               </form>

               <Box
                  sx={{
                     flexGrow: 1,
                     display: { xs: "none", md: "flex" },
                     justifyContent: "flex-end",
                  }}
               >
                  <Box marginLeft={4}>
                     <Link
                        href="#"
                        color="inherit"
                        underline="none"
                        sx={{
                           ":hover": {
                              color: "#e9bbaf",
                           },
                        }}
                     >
                        Login
                     </Link>
                  </Box>

                  <Box marginLeft={4}>
                     <Link
                        href="#"
                        color="inherit"
                        underline="none"
                        sx={{
                           ":hover": {
                              color: "#e9bbaf",
                           },
                        }}
                     >
                        Signup
                     </Link>
                  </Box>
               </Box>

               <Box
                  sx={{
                     display: { xs: "flex", md: "none" },
                  }}
                  marginLeft="auto"
               >
                  <IconButton
                     size="large"
                     aria-label="show more"
                     aria-controls={mobileMenuId}
                     aria-haspopup="true"
                     onClick={handleMobileMenuOpen}
                     color="inherit"
                  >
                     <MenuIcon />
                  </IconButton>
               </Box>
            </Toolbar>
         </AppBar>
         {renderMobileMenu}
      </Box>
   );
}
