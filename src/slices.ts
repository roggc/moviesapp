import getHookAndProviderFromSlices, {
  defineSlice,
} from "react-context-slices";
import { ImageConfig, GuestSession, Rating } from "./types";

export const { useSlice, Provider } = getHookAndProviderFromSlices({
  slices: {
    guestSession: defineSlice<GuestSession | null>({
      initialArg: null,
      init: () => null,
      isGetInitialStateFromStorage: true,
    }),
    imageConfig: defineSlice<ImageConfig | null>({
      initialArg: null,
      middleware: [
        () => (next) => (action) => {
          console.log("in the middleware - imageConfig", action);
          return next(action);
        },
      ],
    }),
    ratings: defineSlice<Rating[]>({
      initialArg: [],
      middleware: [
        () => (next) => (action) => {
          console.log("in the middleware - ratings", action);
          return next(action);
        },
      ],
      isGetInitialStateFromStorage: true,
    }),
  },
});
