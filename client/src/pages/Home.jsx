import React from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { Grid } from "@mui/material";
import { useQuery } from "react-query";

export default function Home() {
   const {
      isSuccess,
      isLoading,
      error,
      data: movieList,
   } = useQuery(
      "movieList",
      () => axios.get(`${import.meta.env.VITE_BACKEND}/api/nowplaying`),
      {
         refetchInterval: 7 * Math.pow(10, 6),
      }
   );

   const {
      isSuccess: isSuccessR,
      isLoading: isLoadingR,
      error: errorR,
      data: genreList,
   } = useQuery(
      "genreList",
      () => axios.get(`${import.meta.env.VITE_BACKEND}/api/genrelist`),
      {
         refetchInterval: 7 * Math.pow(10, 6),
      }
   );

   if (isLoading || isLoadingR) return "Loading...";
   if (error || errorR) return "An error has occurred: " + error.message;

   if (isSuccess && isSuccessR) {
      const movies = movieList.data.map((movie) => {
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
      });
      return (
         <Grid container rowSpacing={7}>
            {movies}
         </Grid>
      );
   }
}
