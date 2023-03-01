import { Button, Grid } from "@mui/material";
import axios from "axios";
import React, { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { UserContext } from "../App";
import { nanoid } from "nanoid";

export default function Watchlist() {
   const { user, setUser } = useContext(UserContext);
   const queryClient = useQueryClient();

   const { isLoading, data } = useQuery("watchlist", () =>
      axios.get(`${import.meta.env.VITE_BACKEND}/protected/favourites`, {
         headers: {
            Authorization: `Bearer ${user.accessToken}`,
         },
      })
   );

   const mutation = useMutation(
      (title) => {
         axios.delete(`${import.meta.env.VITE_BACKEND}/protected/delete`, {
            headers: {
               Authorization: `Bearer ${user.accessToken}`,
            },
            data: {
               title,
            },
         });
      },
      {
         onSuccess: () => {
            queryClient.invalidateQueries("watchlist");
         },
      }
   );

   if (isLoading) return "Loading...";

   return (
      <>
         <h1>Your Watchlist</h1>

         {data.data.map((item) => (
            <Grid
               container
               alignItems="center"
               columnSpacing={1}
               sx={{ marginBottom: "1rem" }}
               key={nanoid()}
            >
               <Grid
                  item
                  sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}
                  xs={7}
                  md={6}
                  lg={4.5}
               >
                  {item}
               </Grid>

               <Grid item xs={5} md={6} lg={7.5}>
                  <Button
                     onClick={() => {
                        mutation.mutate({
                           title: item,
                        });
                     }}
                     sx={{
                        fontSize: { xs: "0.6rem", sm: "1rem" },
                        color: "#424242",
                        bgcolor: "#e9bbaf",
                        marginRight: "auto",
                        ":hover": {
                           color: "#ffffff",
                           bgcolor: "#6d6d6d",
                        },
                     }}
                  >
                     Remove from watchlist
                  </Button>
               </Grid>
            </Grid>
         ))}
      </>
   );
}
