export default function PlayerCard ({player}) {

    const statMap = {
        points: 'PTS',
        rebounds: 'REB',
        assists: 'AST',
        steals: 'STL',
        blocks: 'BLK',
        fouls: 'FLS'
    }

    const renderStatBoxes = () => {
        return Object.keys(statMap).map(stat => (
            <div className="statBox" key={stat}>
                <p className="statValue">{player[stat]}</p>
                <p className="statLabel">{statMap[stat]}</p>
            </div>
        ))}

    return(
        <div className="playerCard">
            <h2 className="playerCardName">{player.name}</h2>
            <p className="playCardInfo">#{player.jerseyNumber} {player.position}</p>

            <div className="statBoxes">
                {renderStatBoxes()}
            </div>
        </div>
    )
}