import styled, { css } from "styled-components";
import Link from "next/link";
import { smallFont, fontWeightMedium } from "./components/core/styled/styles";

export const Main = styled.main`
  margin: 5% 5%;
  color: #efeff1;

  @media (min-width: 640px) {
    margin: 5% 20%;
  }
  @media (min-width: 1380px) {
    margin: 5% 30%;
  }
`;

export const Container = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-areas:
    "setup"
    "chat"
    "leaderboard";
  grid-template-columns: 1fr;

  @media (min-width: 640px) {
    grid-template-areas:
      "setup leaderboard"
      "chat leaderboard";
    grid-template-columns: 2fr 1fr;
  }
`;

export const SetupSection = styled.div`
  grid-area: setup;
`;

export const ChatSection = styled.div`
  grid-area: chat;
`;

export const LeaderboardSection = styled.div<{ streamerMode?: boolean }>`
  grid-area: leaderboard;

  ${({ streamerMode }) =>
    streamerMode &&
    css`
      outline: 2px solid #00b8b8;
      outline-offset: 0.25rem;
      border-radius: 0.375rem;
    `}
`;

export const StyledLink = styled(Link)`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1%;
  ${smallFont}
  ${fontWeightMedium}
  text-decoration: underline;
  text-decoration-color: #9147ff;
  text-decoration-thickness: 0.125rem;
  text-underline-offset: 0.25rem;
`;
