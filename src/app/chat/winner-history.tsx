export interface Winner {
    name: string;
    color: string;
}

const WinnerHistory = ({winners}: {winners: Array<Winner>}) => {
    return (
        <section>
            {(winners || []).map((winner, index) => <p key={index} style={{color: `${winner.color}`}}>{winner.name}</p>)}
        </section>
    );
}

export default WinnerHistory;