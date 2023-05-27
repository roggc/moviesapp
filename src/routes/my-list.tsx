import { useSlice } from "src/slices";
import { useEffect, useState } from "react";
import { Rating, MovieDetails } from "src/types";
import { BASE_URL, API_KEY, MOVIE_DETAILS } from "src/config/api";
import Card from "src/components/card";
import styled from "styled-components";

const MyList = () => {
  const [ratings] = useSlice<Rating[]>("ratings");
  const [moviesDetails, setMoviesDetails] = useState<MovieDetails[]>([]);

  useEffect(() => {
    const fetchMoviesDetails = async () => {
      const promises = ratings.map((r: Rating) =>
        fetch(`${BASE_URL}${MOVIE_DETAILS}${r.movieId}?api_key=${API_KEY}`)
      );
      const results = await Promise.allSettled(promises);
      for await (const result of results) {
        const { status } = result;
        if (status === "fulfilled") {
          const data = await result.value.json();
          setMoviesDetails((md) => [...md, data]);
        }
      }
    };
    fetchMoviesDetails();
  }, [ratings]);

  return (
    <List>
      {moviesDetails.map((md, i) => (
        <Card
          key={`${md.id}_${i}`}
          title={md.title}
          posterPath={md.poster_path}
          releaseDate={md.release_date}
          overView={md.overview}
          rate={ratings.find((rV) => rV.movieId === md?.id + "")?.rating}
        />
      ))}
    </List>
  );
};

export default MyList;

const List = styled.div`
  display: flex;
  flex-direction: column;
`;
