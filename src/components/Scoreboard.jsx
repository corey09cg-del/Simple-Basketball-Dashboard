export default function Scoreboard ({spursScore,opponentScore, gameStatus, 
onNextQuarter, onResetGame, onAddSpursPoints, onAddOpponentPoints, spursFouls, onAddSpursFoul,
opponentFouls, onAddOpponentFoul, formatTime, timeLeft, onStartClock, onStopClock, onResetClock})
  {return (
    <div className="scoreboard">
      <div className="team">
        <p>San Antonio Spurs</p>
        <h1 className="teamScore">{spursScore}</h1>
        <div className="addToScore">
          <button className="scoreboardButton" onClick={() => onAddSpursPoints(1)}>+1</button>
          <button className="scoreboardButton" onClick={() => onAddSpursPoints(2)}>+2</button>
          <button className="scoreboardButton" onClick={() => onAddSpursPoints(3)}>+3</button>
        </div>
        <div>
          <p>Fouls: {spursFouls}</p>
          <button className="foulButton" onClick={onAddSpursFoul}> + Foul</button>
        </div>
      </div>

      <div className="gameStatus">
        <p className="gameClock">{formatTime(timeLeft)}</p>
        <h2 className="status">{gameStatus}</h2>
        {spursScore > opponentScore && gameStatus !== "Final" && gameStatus !== "Pregame" && (
          <p className="message">Spurs are winning!</p>)}
        {spursScore < opponentScore && gameStatus !== "Final" && gameStatus !== "Pregame" && (
          <p className="message">Spurs are down</p>)}      
        {spursScore === opponentScore && gameStatus !== "Final" && gameStatus !== "Pregame" && (
          <p className="message">Game is tied</p>)}
        {spursScore > opponentScore && gameStatus == "Final" && gameStatus !== "Pregame" && (
          <p className="message">Spurs won!</p>)}
        {spursScore < opponentScore && gameStatus == "Final" && gameStatus !== "Pregame" && (
          <p className="message">Spurs lost</p>)}   
        {spursScore === opponentScore && gameStatus == "Final" && gameStatus !== "Pregame" && (
          <p className="message">Going into Overtime</p>)} 
        <div className="quarter-Button">
          <button className="nextQuarter" onClick={onNextQuarter}><strong>Next Quarter</strong></button>
          <button className="resetGame" onClick={onResetGame}><strong>Reset Game</strong></button>
        </div>
        <div className="clockButtonRow">
          <button className="clockButton" onClick={onStartClock}><strong>Start</strong></button>
          <button className="clockButton" onClick={onStopClock}><strong>Stop</strong></button>
          <button className="clockButton" onClick={onResetClock}><strong>Reset Clock</strong></button>
        </div>
      </div>
      


      <div className="team">
        <p>Opponent</p>
        <h1 className="teamScore">{opponentScore}</h1>
        <div className="addToScore">
          <button className="scoreboardButton" onClick={() => onAddOpponentPoints(1)}>+1</button>
          <button className="scoreboardButton" onClick={() => onAddOpponentPoints(2)}>+2</button>
          <button className="scoreboardButton" onClick={() => onAddOpponentPoints(3)}>+3</button>
        </div>
        <div>
          <p>Fouls: {opponentFouls}</p>
          <button className="foulButton" onClick={onAddOpponentFoul}>+ Foul</button>
        </div>
      </div>
    </div>
  )
}