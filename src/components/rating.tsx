import { useState, ChangeEvent, useEffect } from "react";
import styled from "styled-components";

const initialInputValue = "5";
const MAX_INPUT_VALUE = 10;
const MIN_INPUT_VALUE = 0.5;

const Rating = () => {
  const [rating, setRating] = useState(initialInputValue);
  const [auxValue, setAuxValue] = useState(rating);

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

  return (
    <RatingContainer>
      <InputContainer>
        <Label>Rate:</Label>
        <Input
          type="number"
          min={MIN_INPUT_VALUE}
          max={MAX_INPUT_VALUE}
          value={rating}
          onChange={validateInputValue}
          onBlur={onInputBlur}
        />
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
  height: 40px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Label = styled.div``;
