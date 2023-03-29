import { useCallback } from "react";
import { createSlice, A, D } from "react-context-slices";
import { ImageConfig } from "src/types/api";

type S = {
  value: ImageConfig | null;
};

export const name = "imageConfig";
const initialState: S = { value: null };
const SET = "SET";
const reducer = (draft: D<S>, { type, payload }: A) => {
  switch (type) {
    case SET:
      draft.value = payload;
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
      (value: ImageConfig) => dispatch({ type: SET, payload: value }),
      [dispatch]
    );
    return { [name]: { set } };
  }
);
