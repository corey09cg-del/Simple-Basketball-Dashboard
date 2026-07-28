export default function TeamSummary ({players, leadingScorer, gameStatus}) {

    const statMap = {
        points: 'PTS',
        rebounds: 'REB',
        assists: 'AST',
        steals: 'STL',
        blocks: 'BLK',
        fouls: 'FLS'
    }

    const teamTotals = Object.keys(statMap).reduce((totals,stat) => {
        totals[stat] = players.reduce((sum,player) => sum + player[stat],0);
        return totals;
    },{});

    const renderTeamTotals = () => {
        return Object.keys(statMap).map(stat =>
            <div className="statBox" key={stat}>
                <h1 className="statValueSummary">{teamTotals[stat]}</h1>
                <p className="statLabelSummary">{statMap[stat]}</p>
            </div>
        )
    }

    const statusText = gameStatus === "Pregame" ? "The game has not started yet" : `The game is in the ${gameStatus}`;

    return (
        <div className="teamSummary">
            <h2 className="teamSummaryHeader">Team Summary</h2>
            <div className="summaryBoxes">
                {renderTeamTotals()}
            </div>
            <div className="summaryText">
                <p>
                    <strong>Leading scorer: </strong>{leadingScorer.name} with {leadingScorer.points} points.
                </p>
                <p>
                    <strong>Status: </strong>{statusText}
                </p>
            </div>
        </div>
    )
}
