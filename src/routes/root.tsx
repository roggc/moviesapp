import { ThemeProvider } from "styled-components";
import { myTheme } from "src/my-theme";
import Layout from "src/components/layout";
import { Provider } from "src/slices";

const Root = () => {
  return (
    <ThemeProvider theme={myTheme}>
      <Provider>
        <Layout />
      </Provider>
    </ThemeProvider>
  );
};

export default Root;
