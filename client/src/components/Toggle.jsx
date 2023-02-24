import React, { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/material/styles";
import { Box, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
   marginTop: theme.spacing(3),
   backgroundColor: "#6d6d6d",
}));

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
   color: "#ffff",
   [theme.breakpoints.up("xs")]: {
      fontSize: "0.85rem",
   },
   [theme.breakpoints.up("sm")]: {
      fontSize: "1rem",
   },
}));

export default function Toggle() {
   const [alignment, setAlignment] = useState("left");

   const handleAlignment = (event, newAlignment) => {
      if (newAlignment !== null) {
         setAlignment(newAlignment);
      }
   };

   return (
      <Box
         sx={{
            display: "flex",
            justifyContent: { xs: "center", sm: "flex-start" },
         }}
      >
         <StyledToggleButtonGroup
            value={alignment}
            color="secondary"
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
         >
            <StyledToggleButton
               component={RouterLink}
               to="/"
               value="left"
               aria-label="left aligned"
            >
               <Link color="inherit" underline="none">
                  Now Playing
               </Link>
            </StyledToggleButton>
            <StyledToggleButton
               component={RouterLink}
               to="/top-rated"
               value="center"
               aria-label="centered"
            >
               <Link color="inherit" underline="none">
                  Top Rated
               </Link>
            </StyledToggleButton>
            <StyledToggleButton
               component={RouterLink}
               to="/watchlist"
               value="rights"
               aria-label="right aligned"
            >
               <Link color="inherit" underline="none">
                  Watchlist
               </Link>
            </StyledToggleButton>
         </StyledToggleButtonGroup>
      </Box>
   );
}
