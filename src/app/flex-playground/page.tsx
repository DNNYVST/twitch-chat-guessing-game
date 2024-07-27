"use client";

import { Grid, Column } from "../components/core/styled/grid";

// const Container = styled.div`
//   display: grid;

//   grid-gap: 0.5rem;
//   grid-template-rows: 1fr 2fr;
//   grid-template-areas:
//     "setup setup setup leaderboard"
//     "chat chat chat leaderboard";
//   padding: 0.5rem;

//   @media (max-width: 640px) {
//     grid-template-areas:
//       "setup"
//       "chat"
//       "leaderboard";
//   }

//   height: 80vh;
//   border: 2px solid red;
//   margin: 5% 5%;

//   @media (min-width: 640px) {
//     margin: 5% 20%;
//   }
// `;

// const Setup = styled.div`
//   grid-area: setup;
//   border: 2px solid purple;
// `;

// const Chat = styled.div`
//   grid-area: chat;
//   border: 2px solid green;
// `;

// const Leaderboard = styled.div`
//   grid-area: leaderboard;
//   border: 2px solid blue;
// `;

{
  /* <div className="flex flex-row items-stretch space-x-4 border-2 border-red-600 my-[5%] mx-[5%] sm:mx-[20%]"> */
}

export default function Page() {
  return (
    <Grid>
      <Column size={12}>setup</Column>
      <Column size={8}>chat</Column>
      <Column size={4}>leaderboard</Column>
    </Grid>
  );
}
