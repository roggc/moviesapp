import { Outlet, Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect } from "react";
import { BASE_URL, CONFIG, API_KEY, GUEST_SESSION } from "src/config/api";
import { useActions, imageConfig, guestSession, useValues } from "src/slices";
import { MOVIESAPP_GUESTSESSION_VALUE } from "src/constants_/slices";
import { isExpired } from "src/utils/date";

const Layout = () => {
  const { [MOVIESAPP_GUESTSESSION_VALUE]: guestSessionValue } =
    useValues(guestSession);
  const {
    [imageConfig]: { set: setImageConfigValue },
    [guestSession]: { set: setGuestSessionValue },
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

  useEffect(() => {
    const fetchGuestSession = async () => {
      const resp = await fetch(
        `${BASE_URL}${GUEST_SESSION}?api_key=${API_KEY}`
      );
      const data = await resp.json();
      console.log("data", data);
      const { expires_at, guest_session_id, success } = data;
      setGuestSessionValue({
        expiresAt: expires_at,
        sessionId: guest_session_id,
        isSuccess: success,
      });
    };
    if (!guestSessionValue || isExpired(guestSessionValue.expiresAt)) {
      fetchGuestSession();
    }
  }, [guestSessionValue, setGuestSessionValue]);

  useEffect(() => {
    if (!!guestSessionValue) {
      localStorage.setItem(
        MOVIESAPP_GUESTSESSION_VALUE,
        JSON.stringify(guestSessionValue)
      );
    }
  }, [guestSessionValue]);

  return (
    <>
      <Header>
        <Link to="/">Movies App</Link>
        <RightLinksContainer>
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
