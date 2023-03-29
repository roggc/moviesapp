import { ThemeProvider } from "styled-components";
import { myTheme } from "src/my-theme";
import App from "src/app";

const Root = () => {
  return (
    <ThemeProvider theme={myTheme}>
      <App />
    </ThemeProvider>
  );
};

export default Root;
