import { useState, ChangeEvent, useEffect, FC, HTMLAttributes } from "react";
import styled from "styled-components";
import { useSlice } from "src/slices";
import { Rating as RatingType } from "src/types/rating";
import { BASE_URL, API_KEY, movieRating } from "src/config/api";

const initialInputValue = "5";
const MAX_INPUT_VALUE = 10;
const MIN_INPUT_VALUE = 0.5;

type RatingProps = {
  movieId: string | undefined;
} & HTMLAttributes<HTMLDivElement>;

const Rating: FC<RatingProps> = ({ movieId, ...props }) => {
  const [ratings, setRatings] = useSlice("ratings");
  const [{ sessionId }] = useSlice("guestSession");
  const [rating, setRating] = useState(initialInputValue);
  const [auxValue, setAuxValue] = useState(rating);
  const [isDisabled, setIsDisabled] = useState(
    ratings.some((r: RatingType) => r.movieId === movieId)
  );

  const validateInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length) {
      if (parseFloat(value) <= MAX_INPUT_VALUE) {
        setRating(value);
      }
    } else {
      setRating(value);
    }
  };

  const onInputBlur = () => {
    if (rating.length) {
      if (parseFloat(rating) < MIN_INPUT_VALUE) {
        setRating(auxValue);
      }
    } else {
      setRating(auxValue);
    }
  };

  useEffect(() => {
    if (rating.length) {
      const ratingValue = parseFloat(rating);
      if (ratingValue >= MIN_INPUT_VALUE && ratingValue <= MAX_INPUT_VALUE) {
        setAuxValue(rating);
      }
    }
  }, [rating]);

  const submit = async () => {
    setIsDisabled(true);
    const resp = await fetch(
      //prettier-ignore
      `${BASE_URL}${movieRating(movieId)}?api_key=${API_KEY}&guest_session_id=${sessionId}`,
      {
        method: "post",
        headers: {
          "content-type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ value: parseFloat(rating) }),
      }
    );
    const data = await resp.json();
    const { success } = data;
    if (success) {
      const ratingToAdd = { movieId, rating };
      setRatings((rs: any) => [...rs, ratingToAdd]);
    } else {
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("ratings", JSON.stringify(ratings));
  }, [ratings]);

  return (
    <RatingContainer {...props}>
      <InputContainer>
        <Label>Rate:</Label>
        {isDisabled ? (
          <Label>
            {ratings.find((r: RatingType) => r.movieId === movieId)?.rating}
          </Label>
        ) : (
          <>
            <Input
              type="number"
              min={MIN_INPUT_VALUE}
              max={MAX_INPUT_VALUE}
              value={rating}
              onChange={validateInputValue}
              onBlur={onInputBlur}
            />
            <SubmitButton onClick={submit} disabled={isDisabled}>
              Submit
            </SubmitButton>
          </>
        )}
      </InputContainer>
    </RatingContainer>
  );
};

export default Rating;

const RatingContainer = styled.div`
  border: 1px solid black;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.padding};
`;

const Input = styled.input`
  border-radius: ${({ theme }) => theme.borderRadius};
  height: ${({ theme }) => theme.inputHeight};
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Label = styled.div``;

const SubmitButton = styled.button``;
