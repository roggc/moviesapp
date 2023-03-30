import { useCallback } from "react";
import { createSlice, A, D } from "react-context-slices";
import { Rating } from "src/types/rating";
import { MOVIESAPP_RATINGS_VALUE } from "src/constants_/slices";

type S = {
  [MOVIESAPP_RATINGS_VALUE]: Rating[];
};

export const name = "ratings";
const initialState: S = { [MOVIESAPP_RATINGS_VALUE]: [] };
const ADD = "ADD";
const reducer = (draft: D<S>, { type, payload }: A) => {
  switch (type) {
    case ADD:
      draft[MOVIESAPP_RATINGS_VALUE].push(payload);
      break;
    default:
      break;
  }
};

export const { useValues, useActions, Provider } = createSlice<S>(
  reducer,
  initialState,
  name,
  (useDispatch) => () => {
    const dispatch = useDispatch();
    const add = useCallback(
      (value: Rating) => dispatch({ type: ADD, payload: value }),
      [dispatch]
    );
    return { [name]: { add } };
  },
  [MOVIESAPP_RATINGS_VALUE]
);
