export default function PlayerSelector ({players, onSelectPlayer,leadingScorer,selectedPlayerID}) {
    return(
        <div className="playerSelector">
            <div className="playerList">
                <h2 className="playerSelectorTitle">Player Selector</h2>
                {players.map((player)=>(
                    <button className={`playerButton
                        ${player.id === selectedPlayerID ? "active" : ""}
                        ${player.id === leadingScorer.id && player.points > 0 ? "leading" : ""}`}
                        key={player.id} onClick={() => onSelectPlayer(player.id)}>
                        <span>{player.name} - </span>
                        <span>{player.position}</span>
                        <span>  #{player.jerseyNumber}</span>
                    </button>
                ))
                }
            </div>
        </div>
    )
    }