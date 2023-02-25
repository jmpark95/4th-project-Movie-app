import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

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

export default function Toggle({ alignment, handleAlignment }) {
   return (
      <Box
         sx={{
            display: "flex",
            justifyContent: { xs: "center", sm: "flex-start" },
            marginBottom: "2rem",
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
               Now Playing
            </StyledToggleButton>
            <StyledToggleButton
               component={RouterLink}
               to="/top-rated"
               value="center"
               aria-label="centered"
            >
               Top Rated
            </StyledToggleButton>
            <StyledToggleButton
               component={RouterLink}
               to="/watchlist"
               value="right"
               aria-label="right aligned"
            >
               Watchlist
            </StyledToggleButton>
         </StyledToggleButtonGroup>
      </Box>
   );
}
