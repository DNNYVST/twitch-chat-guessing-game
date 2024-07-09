interface Winner {
    userColor: string;
    userName: string;
}

const WinnerHistory = ({winners}: {winners: Array<Winner>}) => {
    return (
        <section>
            <p>Winners:</p>
            {(winners || []).map((winner, index) => <p key={index} style={{color: `${winner.userColor}`}}>{winner.userName}</p>)}
        </section>
    );
}

export default WinnerHistory;