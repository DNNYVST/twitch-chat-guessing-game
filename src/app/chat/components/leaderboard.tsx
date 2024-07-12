import Button from "./core/button";
import WinnerHistory, { Winner } from "./winner-history";

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
        <WinnerHistory winners={winners || []} />
      </div>
    </>
  );
};

export default Leaderboard;
