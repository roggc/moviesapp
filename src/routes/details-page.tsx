import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL, MOVIE_DETAILS, API_KEY } from "src/config/api";
import { MovieDetails } from "src/types/api";
import Card from "src/components/card";
import Rating from "src/components/rating";

const DetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
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

  return (
    <>
      <Card
        title={movieDetails?.title}
        releaseDate={movieDetails?.release_date}
        posterPath={movieDetails?.poster_path}
        overView={movieDetails?.overview}
      />
      <Rating movieId={movieId} />
    </>
  );
};

export default DetailsPage;
