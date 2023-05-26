import getHookAndProviderFromSlices from "react-context-slices";

export const { useSlice, Provider } = getHookAndProviderFromSlices(
  {
    guestSession: null,
    imageConfig: null,
    ratings: [],
  },
  { guestSession: true, ratings: true }
);
