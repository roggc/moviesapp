import getHookAndProviderFromSlices, {
  defineSlice,
} from "react-context-slices";

export const { useSlice, Provider } = getHookAndProviderFromSlices({
  guestSession: defineSlice<any>({
    initialState: null,
    isGetInitialStateFromStorage: true,
  }),
  imageConfig: defineSlice<any>({ initialState: null }),
  ratings: defineSlice<any[]>({
    initialState: [],
    isGetInitialStateFromStorage: true,
  }),
});
