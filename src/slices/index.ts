import { composeProviders } from "react-context-slices";
import {
  useValues as useImageConfigValues,
  useActions as useImageConfigActions,
  Provider as ImageConfigProvider,
} from "./image-config";
import {
  useValues as useGuestSessionValues,
  useActions as useGuestSessionActions,
  Provider as GuestSessionProvider,
} from "./guest-session";

export { name as imageConfig } from "./image-config";
export { name as guestSession } from "./guest-session";

export const useValues = (slice: string) => ({
  ...useImageConfigValues(slice),
  ...useGuestSessionValues(slice),
});

export const useActions = () => ({
  ...useImageConfigActions(),
  ...useGuestSessionActions(),
});

export default composeProviders([ImageConfigProvider, GuestSessionProvider]);
