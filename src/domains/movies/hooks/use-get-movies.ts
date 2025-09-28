import { useQuery } from "@tanstack/react-query";
import { IMovie } from "../models/movies-types";

export const useGetMovies = () => {
  const { isPending, isError, data, error } = useQuery<
    IMovie,
    Error,
    IMovie,
    string[]
  >({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  return { isPending, isError, data: data?.movieListResult?.movieList, error };
};

export const fetchMovies = async () => {
  const response = await fetch(
    `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`
  );
  const result = await response.json();
  console.log(result);
  return result;
};
