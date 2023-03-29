import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useEffect } from "react";
import { BASE_URL, CONFIG, API_KEY } from "src/config/api";
import { useActions, imageConfig } from "src/slices";

const Layout = () => {
  const {
    [imageConfig]: { set: setImageConfigValue },
  } = useActions();
  useEffect(() => {
    const fetchConfiguration = async () => {
      const resp = await fetch(`${BASE_URL}${CONFIG}?api_key=${API_KEY}`);
      const data = await resp.json();
      console.log("data", data);
      const { images } = data;
      setImageConfigValue(images);
    };
    fetchConfiguration();
  }, [setImageConfigValue]);
  return (
    <>
      <Header>Movies App</Header>
      <Outlet />
    </>
  );
};

export default Layout;

const Header = styled.div`
  position: sticky;
  top: 0;
  border-bottom: 1px solid black;
  padding: ${({ theme }) => theme.padding};
  background-color: white;
`;
