import Button from "./core/button";
export interface Winner {
  name: string;
  color: string;
}

const clearLeaderboard = () => {
  localStorage.clear();
  localStorage.winners = JSON.stringify([]);
};

const Leaderboard = ({ winners }: { winners: Winner[] }) => {
  return (
    <>
      <Button
        aria-label="Clear leaderboard"
        onClick={clearLeaderboard}
        disabled={!winners.length}
      >
        Clear
      </Button>
      <div className="mt-2 overflow-y-scroll min-h-72 max-h-72">
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
    </>
  );
};

export default Leaderboard;
