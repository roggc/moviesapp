import { useParams } from "react-router-dom";

const DetailsPage = () => {
  const { movieId } = useParams();
  return <>{movieId}</>;
};

export default DetailsPage;
