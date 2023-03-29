import { ThemeProvider } from "styled-components";
import { myTheme } from "src/my-theme";
import Layout from "src/components/layout";
import SlicesProvider from "src/slices";

const Root = () => {
  return (
    <ThemeProvider theme={myTheme}>
      <SlicesProvider>
        <Layout />
      </SlicesProvider>
    </ThemeProvider>
  );
};

export default Root;
