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
      fontSize: "0.6rem",
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
            <StyledToggleButton value="left" aria-label="left aligned">
               <Link
                  component={RouterLink}
                  to="/"
                  color="inherit"
                  underline="none"
               >
                  Now Playing
               </Link>
            </StyledToggleButton>
            <StyledToggleButton value="center" aria-label="centered">
               <Link
                  component={RouterLink}
                  to="/top-rated"
                  color="inherit"
                  underline="none"
               >
                  Top Rated
               </Link>
            </StyledToggleButton>
            <StyledToggleButton
               value="center-right"
               aria-label="centered-right"
            >
               <Link
                  component={RouterLink}
                  to="/coming-soon"
                  color="inherit"
                  underline="none"
               >
                  Coming Soon
               </Link>
            </StyledToggleButton>
            <StyledToggleButton value="rights" aria-label="right aligned">
               <Link
                  component={RouterLink}
                  to="/watchlist"
                  color="inherit"
                  underline="none"
               >
                  Watchlist
               </Link>
            </StyledToggleButton>
         </StyledToggleButtonGroup>
      </Box>
   );
}
