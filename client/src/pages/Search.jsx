import React from "react";
import axios from "axios";
import { Box, Button, Container, Grid } from "@mui/material";
import { useQuery, useInfiniteQuery } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import { useOutletContext } from "react-router-dom";
import MovieCard from "../components/MovieCard";

export default function Search() {
   const [formInput, setFormInput] = useOutletContext();

   const fetchMovies = async ({ pageParam = 1 }) => {
      const res = await fetch(
         `${import.meta.env.VITE_BACKEND}/api/search/${formInput}/${pageParam}`
      );
      return res.json();
   };

   const {
      data: movieList,
      fetchNextPage,
      isFetching,
      status,
   } = useInfiniteQuery(["searchList", formInput], fetchMovies, {
      getNextPageParam: (lastPage, pages) => {
         return lastPage.page + 1;
      },
   });

   const {
      isSuccess,
      isLoading,
      error,
      data: genreList,
   } = useQuery("genreList", () =>
      axios.get(`${import.meta.env.VITE_BACKEND}/api/genrelist`)
   );

   const loadMoreBtn = (
      <Container
         sx={{
            display: "flex",
            marginTop: "2rem",
            marginBottom: "3rem",
         }}
      >
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
   );

   const loadingSpinner = (
      <Box
         sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1.5rem",
            marginBottom: "3rem",
         }}
      >
         <CircularProgress color="secondary" />
      </Box>
   );

   if (status === "loading" || isLoading)
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

   if (status === "error" || error) return "An error has occurred: ";

   if (status === "success" && isSuccess) {
      const movies = movieList.pages.map((page) =>
         page.results.map((movie) => (
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
         ))
      );

      return (
         <>
            <Grid container rowSpacing={7}>
               {movies}
            </Grid>

            {isFetching ? loadingSpinner : loadMoreBtn}
         </>
      );
   }
}
