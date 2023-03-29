import { useEffect, useState } from "react";
import styled from "styled-components";
import { Movie } from "src/types/api";
import { BASE_URL, API_KEY, POPULAR_MOVIES } from "src/config/api";
import { useNavigate } from "react-router-dom";
import { useValues, imageConfig } from "src/slices";

const MoviesList = () => {
  const { value: imageConfigValue } = useValues(imageConfig);
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
      {movies.map((m) => (
        <Card key={m.id} onClick={() => navigate(`details/${m.id}`)}>
          <Image
            src={`${imageConfigValue?.base_url}${imageConfigValue?.poster_sizes?.[4]}${m.poster_path}`}
            alt={m.title}
          />
          <CardRightContainer>
            <Title>{m.title}</Title>
            <ReleaseDate>{m.release_date}</ReleaseDate>
          </CardRightContainer>
        </Card>
      ))}
    </PageContainer>
  );
};

export default MoviesList;

const Card = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.padding};
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.main};
  cursor: pointer;
`;

const Image = styled.img`
  width: 100px;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const CardRightContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div``;
const ReleaseDate = styled.div``;

const PageContainer = styled.div`
  display: inline-flex;
`;
