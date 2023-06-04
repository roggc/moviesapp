import getHookAndProviderFromSlices, {
  defineSlice,
} from "react-context-slices";
import { ImageConfig, GuestSession, Rating } from "./types";

export const { useSlice, Provider } = getHookAndProviderFromSlices({
  guestSession: defineSlice<GuestSession | null>({
    initialArg: null,
    init: () => null,
    isGetInitialStateFromStorage: true,
  }),
  imageConfig: defineSlice<ImageConfig | null>({ initialArg: null }),
  ratings: defineSlice<Rating[]>({
    initialArg: [],
    isGetInitialStateFromStorage: true,
  }),
});
