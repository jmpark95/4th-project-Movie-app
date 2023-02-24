import React from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { Box, Button, Container, Grid } from "@mui/material";
import { useQuery, useInfiniteQuery } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";

export default function Top() {
   const fetchMovies = async ({ pageParam = 1 }) => {
      return await (
         await fetch(
            `${import.meta.env.VITE_BACKEND}/api/top-rated/${pageParam}`
         )
      ).json();
   };

   const { data, error, fetchNextPage, hasNextPage, isFetching, status } =
      useInfiniteQuery("topMovieList", fetchMovies, {
         getNextPageParam: (lastPage, pages) => {
            return lastPage.page + 1;
         },
      });

   const {
      isSuccess: isSuccessR,
      isLoading: isLoadingR,
      error: errorR,
      data: genreList,
   } = useQuery("genreList", () =>
      axios.get(`${import.meta.env.VITE_BACKEND}/api/genrelist`)
   );

   if (status === "loading" || isLoadingR)
      return (
         <Box
            sx={{
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               height: "100%",
            }}
         >
            <CircularProgress color="secondary" />
         </Box>
      );
   if (status === "error" || errorR)
      return "An error has occurred: " + error.message;

   if (status === "success" && isSuccessR) {
      const movies = data.pages.map((page) =>
         page.results.map((movie) => {
            return (
               <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  poster={movie.poster_path}
                  image={movie.backdrop_path}
                  date={movie.release_date}
                  overview={movie.overview}
                  genres={movie.genre_ids.map((id) => {
                     const genreName = genreList.data.find(
                        (element) => element.id === id
                     );
                     return genreName.name;
                  })}
               />
            );
         })
      );

      return (
         <>
            <Grid container rowSpacing={7}>
               {movies}
            </Grid>

            {hasNextPage && (
               <Container sx={{ display: "flex", marginTop: "2rem" }}>
                  <Button
                     sx={{
                        py: { xs: "0.8rem" },
                        px: { xs: "2rem", md: "3.5rem" },
                        color: "#424242",
                        bgcolor: "#e9bbaf",
                        margin: "auto",
                        ":hover": {
                           color: "#ffffff",
                           bgcolor: "#6d6d6d",
                        },
                     }}
                     onClick={fetchNextPage}
                  >
                     Load More
                  </Button>
               </Container>
            )}
            {isFetching && (
               <Box
                  sx={{
                     display: "flex",
                     justifyContent: "center",
                     marginTop: "1.5rem",
                  }}
               >
                  <CircularProgress color="secondary" />
               </Box>
            )}
         </>
      );
   }
}
