import { composeProviders } from "react-context-slices";
import {
  useValues as useImageConfigValues,
  useActions as useImageConfigActions,
  Provider as ImageConfigProvider,
} from "./image-config";

export { name as imageConfig } from "./image-config";

export const useValues = (slice: string) => ({
  ...useImageConfigValues(slice),
});

export const useActions = () => ({
  ...useImageConfigActions(),
});

export default composeProviders([ImageConfigProvider]);
