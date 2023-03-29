import { ThemeProvider } from "styled-components";
import { myTheme } from "src/my-theme";
import Layout from "src/components/layout";

const Root = () => {
  return (
    <ThemeProvider theme={myTheme}>
      <Layout />
    </ThemeProvider>
  );
};

export default Root;
