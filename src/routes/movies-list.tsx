import { useEffect, useState } from "react";
import styled from "styled-components";
import { Movie } from "src/types/api";
import { BASE_URL, API_KEY, POPULAR_MOVIES } from "src/config/api";
import { useNavigate } from "react-router-dom";
import Card from "src/components/card";

const MoviesList = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    const fetchMovies = async () => {
      const resp = await fetch(
        `${BASE_URL}${POPULAR_MOVIES}?api_key=${API_KEY}`
      );
      const data = await resp.json();
      console.log("data", data);
      const { results } = data;
      setMovies(results);
    };
    fetchMovies();
  }, []);

  return (
    <PageContainer>
      {movies.map(({ id, poster_path, release_date, title }) => (
        <Card
          key={id}
          onClick={() => navigate(`details/${id}`)}
          title={title}
          posterPath={poster_path}
          releaseDate={release_date}
        />
      ))}
    </PageContainer>
  );
};

export default MoviesList;

const PageContainer = styled.div`
  display: inline-flex;
`;
