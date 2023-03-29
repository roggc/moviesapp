import { useEffect, useState } from "react";
import styled from "styled-components";
import { Movie, ImageConfig } from "src/types/api";
import { BASE_URL, API_KEY, POPULAR_MOVIES, CONFIG } from "src/config/api";

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [config, setConfig] = useState<ImageConfig | undefined>();
  useEffect(() => {
    const fetchConfiguration = async () => {
      const resp = await fetch(`${BASE_URL}${CONFIG}?api_key=${API_KEY}`);
      const data = await resp.json();
      console.log("data", data);
      const { images } = data;
      setConfig(images);
    };
    const fetchMovies = async () => {
      const resp = await fetch(
        `${BASE_URL}${POPULAR_MOVIES}?api_key=${API_KEY}`
      );
      const data = await resp.json();
      console.log("data", data);
      const { results } = data;
      setMovies(results);
    };
    fetchConfiguration();
    fetchMovies();
  }, []);

  return (
    <>
      {movies.map((m) => (
        <Card key={m.id}>
          <Image
            src={`${config?.base_url}${config?.poster_sizes?.[4]}${m.poster_path}`}
            alt={m.title}
          />
          <CardRightContainer>
            <Title>{m.title}</Title>
            <ReleaseDate>{m.release_date}</ReleaseDate>
          </CardRightContainer>
        </Card>
      ))}
    </>
  );
};

export default App;

const Card = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.padding};
  display: flex;
`;

const Image = styled.img`
  width: 100px;
`;

const CardRightContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div``;
const ReleaseDate = styled.div``;
