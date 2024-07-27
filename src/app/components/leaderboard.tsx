import { Card } from "./core/styled/card";
import { Button } from "./core/styled/button";
import { Username } from "./user-message";
import styled from "styled-components";
import { smallFont, fontWeightMedium } from "../components/core/styled/styles";
export interface Winner {
  name: string;
  color: string;
}

const clearLeaderboard = () => {
  localStorage.clear();
  localStorage.winners = JSON.stringify([]);
};

const UsernameWrapper = styled(Username)`
  ${smallFont}
  ${fontWeightMedium}
`;

const Leaderboard = ({
  winners,
  showClearButton = true,
}: {
  winners: Winner[];
  showClearButton?: boolean;
}) => {
  return (
    <Card
      title="Leaderboard"
      button={
        showClearButton && (
          <Button
            aria-label="Clear leaderboard"
            onClick={clearLeaderboard}
            disabled={!winners.length}
            variant="destructive"
          >
            Clear
          </Button>
        )
      }
    >
      <div className="mt-2 overflow-y-scroll min-h-72 max-h-[348px]">
        <>
          {(winners || []).map((winner, index) => (
            <UsernameWrapper key={index} color={winner.color}>
              {winner.name}
            </UsernameWrapper>
          ))}
        </>
      </div>
    </Card>
  );
};

export default Leaderboard;
