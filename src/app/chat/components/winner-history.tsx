export interface Winner {
  name: string;
  color: string;
}

const WinnerHistory = ({ winners }: { winners: Array<Winner> }) => {
  return (
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
  );
};

export default WinnerHistory;
