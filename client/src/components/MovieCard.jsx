import React, { useContext, useState } from "react";
import { Grid, Box, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import { UserContext } from "../App";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

export default function MovieCard({
   id,
   title,
   poster,
   image,
   date,
   overview,
   genres,
}) {
   const [open, setOpen] = useState(false);
   const { user, setUser } = useContext(UserContext);
   const imagePath = "https://image.tmdb.org/t/p/original";
   const queryClient = useQueryClient();

   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const mutation = useMutation(
      (title) => {
         axios.post(`${import.meta.env.VITE_BACKEND}/protected/add`, title, {
            headers: {
               Authorization: `Bearer ${user.accessToken}`,
            },
         });
      },
      {
         onSuccess: () => {
            queryClient.invalidateQueries("watchlist");
         },
      }
   );

   const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: { xs: "80%", lg: "80%", xl: "65%" },
      height: "55%",
      border: "1px solid white",
      outline: "none",
      boxShadow: 24,
      bgcolor: "#303030",
      borderRadius: "0.3rem",
      p: 2,
      display: "flex",
      gap: "2rem",
      flexDirection: { xs: "column", md: "row" },
      justifyContent: "center",
      alignItems: "center",
      textAlign: { xs: "center", md: "left" },
   };

   return (
      <Grid
         item
         xs={12}
         sm={6}
         lg={4}
         display="flex"
         flexDirection="column"
         justifyContent="center"
         alignItems="center"
      >
         <Box
            component="img"
            sx={{
               height: { xs: 300, lg: 360 },
               width: { xs: 200, lg: 240 },
               cursor: "pointer",
               borderRadius: "5px",
               marginBottom: "0.5rem",
            }}
            alt={title}
            src={imagePath + poster}
            onClick={handleOpen}
         />
         <Box
            sx={{
               fontSize: {
                  xs: "0.9rem",
                  sm: "1rem",
                  md: "1.2rem",
                  xl: "1.4rem",
               },
               textAlign: "center",
            }}
         >
            {title}
         </Box>

         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box sx={style}>
               <Box
                  component="img"
                  src={imagePath + image}
                  sx={{
                     height: { md: 250 },
                     width: { md: 300 },
                     display: { xs: "none", md: "block" },
                  }}
               />

               <Box
                  sx={{
                     display: "flex",
                     flexDirection: "column",
                     gap: { xs: "0.5rem", lg: "1rem" },
                  }}
               >
                  <Box
                     sx={{
                        fontSize: { xs: "1.7rem", lg: "1.9rem" },
                        lineHeight: "100%",
                        color: "#e9bbaf",
                     }}
                  >
                     {title}
                  </Box>

                  <Box sx={{ fontSize: { xs: "1rem", lg: "1.1rem" } }}>
                     Release date: {date}{" "}
                  </Box>
                  <Box sx={{ fontSize: { xs: "1rem", lg: "1.1rem" } }}>
                     Genre: {genres.join(", ")}{" "}
                  </Box>
                  <Box sx={{ fontSize: { xs: "0.8rem", lg: "0.9rem" } }}>
                     {overview}
                  </Box>
                  {user ? (
                     <Button
                        variant="contained"
                        onClick={() => {
                           mutation.mutate({
                              title,
                           });
                           alert("Added to watchlist!");
                        }}
                        sx={{
                           width: { xs: "80%", sm: "50%", lg: "40%" },
                           margin: { xs: "auto", md: "0" },
                           bgcolor: "#e9bbaf",
                           color: "#424242",

                           ":hover": {
                              color: "#ffff",
                              bgcolor: "#424242",
                           },
                        }}
                     >
                        Add to Watchlist
                     </Button>
                  ) : (
                     <Button
                        variant="contained"
                        disabled
                        sx={{
                           width: { xs: "80%", sm: "50%", lg: "40%" },
                           margin: { xs: "auto", md: "0" },
                           fontSize: { xs: "0.6rem", sm: "0.9rem" },
                           bgcolor: "#e9bbaf",
                           color: "#424242",
                           "&.Mui-disabled": {
                              background: "#6d6d6d",
                              color: "#1b1b1b",
                           },
                        }}
                     >
                        Login or Signup to add to watchlist
                     </Button>
                  )}
               </Box>
            </Box>
         </Modal>
      </Grid>
   );
}
