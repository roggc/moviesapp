import { useCallback } from "react";
import { createSlice, A, D } from "react-context-slices";
import { GuestSession } from "src/types/api";
import { MOVIESAPP_GUESTSESSION_VALUE } from "src/constants_/slices";

type S = {
  [MOVIESAPP_GUESTSESSION_VALUE]: GuestSession | null;
};

export const name = "guestSession";
const initialState: S = { [MOVIESAPP_GUESTSESSION_VALUE]: null };
const SET = "SET";
const reducer = (draft: D<S>, { type, payload }: A) => {
  switch (type) {
    case SET:
      draft[MOVIESAPP_GUESTSESSION_VALUE] = payload;
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
    const set = useCallback(
      (value: GuestSession) => dispatch({ type: SET, payload: value }),
      [dispatch]
    );
    return { [name]: { set } };
  },
  [MOVIESAPP_GUESTSESSION_VALUE]
);
