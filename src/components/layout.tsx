import { Outlet, Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect } from "react";
import { BASE_URL, CONFIG, API_KEY, GUEST_SESSION } from "src/config/api";
import { useSlice } from "src/slices";
import { isExpired } from "src/utils/date";
import { GuestSession } from "src/types";

const Layout = () => {
  const [guestSession, setGuestSession] =
    useSlice<GuestSession>("guestSession");
  const [, setImageConfig] = useSlice("imageConfig");

  useEffect(() => {
    const fetchConfiguration = async () => {
      const resp = await fetch(`${BASE_URL}${CONFIG}?api_key=${API_KEY}`);
      const data = await resp.json();
      const { images } = data;
      setImageConfig(images);
    };
    fetchConfiguration();
  }, [setImageConfig]);

  useEffect(() => {
    const fetchGuestSession = async () => {
      const resp = await fetch(
        `${BASE_URL}${GUEST_SESSION}?api_key=${API_KEY}`
      );
      const data = await resp.json();
      const { expires_at, guest_session_id, success } = data;
      setGuestSession({
        expiresAt: expires_at,
        sessionId: guest_session_id,
        isSuccess: success,
      });
    };
    if (!guestSession || isExpired(guestSession.expiresAt)) {
      fetchGuestSession();
    }
  }, [guestSession, setGuestSession]);

  useEffect(() => {
    if (!!guestSession) {
      localStorage.setItem("guestSession", JSON.stringify(guestSession));
    }
  }, [guestSession]);

  return (
    <>
      <Header>
        <Link to="/">Movies App</Link>
        <RightLinksContainer>
          <Link to="/">popular</Link>
          <Link to="search-movies">search</Link>
          <Link to="my-list">myList</Link>
        </RightLinksContainer>
      </Header>
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
  display: flex;
  justify-content: space-between;
`;

const RightLinksContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;
