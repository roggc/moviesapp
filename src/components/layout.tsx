import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Layout = () => {
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
