import { FC } from "react";
import styled from "styled-components";
import { useValues, imageConfig } from "src/slices";

type CardProps = {
  title: string | undefined;
  releaseDate: string | undefined;
  posterPath: string | undefined;
  overView?: string | undefined;
  onClick?: () => void;
};

const Card: FC<CardProps> = ({
  title,
  releaseDate,
  posterPath,
  overView,
  onClick,
  ...props
}) => {
  const { value: imageConfigValue } = useValues(imageConfig);
  return (
    <CardContainer
      onClick={() => onClick?.()}
      isClickable={!!onClick}
      {...props}
    >
      <Image
        src={`${imageConfigValue?.base_url}${imageConfigValue?.poster_sizes?.[4]}${posterPath}`}
        alt={title}
      />
      <CardRightContainer>
        <Title>{title}</Title>
        <ReleaseDate>{releaseDate}</ReleaseDate>
        {!!overView && <OverView>{overView}</OverView>}
      </CardRightContainer>
    </CardContainer>
  );
};

export default Card;

type CardContainerProps = {
  isClickable: boolean;
};

const CardContainer = styled.div<CardContainerProps>`
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.padding};
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.main};
  ${({ isClickable }) => (isClickable ? "cursor: pointer;" : "")}
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
const OverView = styled.div``;
