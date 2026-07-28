export default function StatControls ({selectedPlayer, onAddPoints, onAddStats, onUndo, canUndo}) {
    return (
        <div className="statsControls">
            <h2 className="statsControlHeader">Stat Controls</h2>
            <div className="statButtons">
                <button className="statButton" onClick={() => onAddPoints(selectedPlayer.id, 1)}>+ 1 Point</button>
                <button className="statButton" onClick={() => onAddPoints(selectedPlayer.id, 2)}>+ 2 Point</button>
                <button className="statButton" onClick={() => onAddPoints(selectedPlayer.id, 3)}>+ 3 Point</button>
            </div>
            <div className="statButtons">
                <button className="statButton" onClick={() => onAddStats(selectedPlayer.id, "rebounds")}>+ Rebound</button>
                <button className="statButton" onClick={() => onAddStats(selectedPlayer.id, "assists")}>+ Assist</button>
                <button className="statButton" onClick={() => onAddStats(selectedPlayer.id, "steals")}>+ Steal</button>
                <button className="statButton" onClick={() => onAddStats(selectedPlayer.id, "blocks")}>+ Block</button>
                <button className="statButton" onClick={() => onAddStats(selectedPlayer.id, "fouls")} disabled={selectedPlayer.fouls ==6}>+ Foul</button>
            </div>
            <div>
                <button className="undo" onClick={onUndo} disabled={!canUndo}>Undo</button>
            </div>
        </div>
    )
}