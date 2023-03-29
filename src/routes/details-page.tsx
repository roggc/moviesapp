import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL, MOVIE_DETAILS, API_KEY } from "src/config/api";
import { MovieDetails } from "src/types/api";

const DetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState<MovieDetails>();
  useEffect(() => {
    const fetchMovieDetails = async () => {
      const resp = await fetch(
        `${BASE_URL}${MOVIE_DETAILS}${movieId}?api_key=${API_KEY}`
      );
      const data = await resp.json();
      console.log("data", data);
      setMovieDetails(data);
    };
    fetchMovieDetails();
  }, [movieId]);
  return <>{movieId}</>;
};

export default DetailsPage;
