import { useState, ChangeEvent, useEffect } from "react";
import styled from "styled-components";
import { useDebounce } from "src/hooks";
import { DEBOUNCE_TIME } from "src/constants_";
import { BASE_URL, SEARCH_MOVIES, API_KEY } from "src/config/api";
import { MovieDetails } from "src/types";
import Card from "src/components/card";
import { useNavigate } from "react-router-dom";

const SearchMovies = () => {
  const navigate = useNavigate();
  const [moviesList, setMoviesList] = useState<MovieDetails[]>([]);
  const debounce = useDebounce();
  const [inputTextValue, setInputTextValue] = useState("");
  const [querySearch, setQuerySearch] = useState("");

  const debounced = debounce(
    (query: string) => setQuerySearch(query),
    DEBOUNCE_TIME
  );

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputTextValue(value);
  };

  useEffect(() => {
    debounced(inputTextValue);
  }, [inputTextValue, debounced]);

  useEffect(() => {
    const fetchSearchMovies = async () => {
      const resp = await fetch(
        `${BASE_URL}${SEARCH_MOVIES}?api_key=${API_KEY}&query=${querySearch}`
      );
      const data = await resp.json();
      const { results } = data;
      setMoviesList(results);
    };
    fetchSearchMovies();
  }, [querySearch]);

  return (
    <>
      <Input
        type="text"
        size={50}
        value={inputTextValue}
        onChange={onInputChange}
      />
      <List>
        {moviesList.map((m: MovieDetails, i: number) => (
          <Card
            key={`${m.id}_${i}`}
            posterPath={m.poster_path}
            releaseDate={m.release_date}
            title={m.title}
            onClick={() => navigate(`/details/${m.id}`)}
          />
        ))}
      </List>
    </>
  );
};

export default SearchMovies;

const Input = styled.input`
  border-radius: ${({ theme }) => theme.borderRadius};
  height: ${({ theme }) => theme.inputHeight};
`;

const List = styled.div`
  display: inline-flex;
  overflow-x: scroll;
  max-width: 100vw;
`;
