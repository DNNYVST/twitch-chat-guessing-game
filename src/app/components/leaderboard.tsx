import Button from "./core/styled/button";

import Card from "./core/styled/card";

export interface Winner {
  name: string;
  color: string;
}

const clearLeaderboard = () => {
  localStorage.clear();
  localStorage.winners = JSON.stringify([]);
};

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
            <p
              key={index}
              className="text-sm font-medium"
              style={{ color: `${winner.color}` }}
            >
              {winner.name}
            </p>
          ))}
        </>
      </div>
    </Card>
  );
};

export default Leaderboard;
