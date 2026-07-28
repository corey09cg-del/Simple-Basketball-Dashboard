import { useState, useEffect } from 'react'
import './App.css'
import Scoreboard from './components/Scoreboard';
import { initialPlayers } from './data/players';
import PlayerSelector from './components/PlayerSelector';
import PlayerCard from './components/PlayerCard';
import StatControls from './components/StatControls';
import TeamSummary from './components/TeamSummary';
import spursImage from './assets/san-antonio-spurs-seeklogo.png'

export default function App() {
  const [spursScore, setSpursScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [quarter, setQuarter] = useState(0);
  const [gameStatus, setGameStatus] = useState("Pregame");
  const [selectedPlayerId, setSelectedPlayerId] = useState(1);
  const [players, setPlayers] = useState(initialPlayers)
  const [spursFouls, setSpursFouls] = useState(0);
  const [opponentFouls, setOpponentFouls] = useState(0);
  const [history, setHistory] = useState([]);
  const [timeLeft, setTimeLeft] = useState(720);
  const [clockRunning, setClockRunning] = useState(false);

  const selectedPlayer = players.find(player => player.id === selectedPlayerId);

  let leadingScorer = players[0]
  for (const player of players) {
    if (player.points > leadingScorer.points) {
      leadingScorer = player;
    }
  }

  useEffect(() => {

    if (!clockRunning) return;

    if (timeLeft === 0) {
      setClockRunning(false);
      return;
    }
    // Set a timeout to decrease the time left by 1 second
    const timeout = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timeout);

  }, [clockRunning, timeLeft]);


  useEffect(() => {
    if (quarter === 0) {
        setGameStatus("Pregame")
      } else if (quarter === 1) {
        setGameStatus("1st Quarter")
      } else if (quarter === 2) {
        setGameStatus("2nd Quarter")
      } else if (quarter === 3) {
        setGameStatus("3rd Quarter")
      } else if (quarter === 4) {
        setGameStatus("4th Quarter")
      } else {
        setGameStatus("Final")
      }
      setTimeLeft(720);
      setClockRunning(false);
    }, [quarter]);



  useEffect(() => {
    console.log(`Selected player changed to ${selectedPlayer?.name}`);
  }, [selectedPlayer]);

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  function startClock() {
    setClockRunning(true);
  }

  function stopClock() {
    setClockRunning(false);
  }

  // Reset the clock to 12 minutes and stop it
  function resetClock() {
    setClockRunning(false)
    setTimeLeft(720)
  }

  function addSpursPoints(points) {
    setSpursScore(prev => prev + points);
  }

  function addOpponentPoints(points) {
    setOpponentScore(prev => prev + points)
  }

  function ontoNextQuarter() {
    setQuarter(prev => prev + 1);
  }

  function undoAction() {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setPlayers(previous.players);
    setSpursScore(previous.spursScore);
    setHistory(prev => prev.slice(0, -1));
  }

  function resetGame() {
    setSpursScore(0)
    setOpponentScore(0)
    setQuarter(0)
    setSpursFouls(0)
    setOpponentFouls(0)
    setGameStatus("Pregame")
    setPlayers(initialPlayers)
    setHistory([])
    setTimeLeft(720)
    setClockRunning(false)
  }

  function addPlayerPoints(playerId, pointsToAdd) {
    setHistory(prev => [...prev, {players, spursScore}]);
    setPlayers(prevPlayers =>
      prevPlayers.map(player =>
        player.id === playerId
          ? { ...player, points: player.points + pointsToAdd } : player
      )
    );
    setSpursScore(prevScore => prevScore + pointsToAdd)
  }

  function addPlayerStats(playerId, stat) {
    setHistory(prev => [...prev, {players, spursScore}])
    setPlayers(prevPlayers =>
      prevPlayers.map(player =>
        player.id === playerId
          ? { ...player, [stat]: player[stat] + 1 } : player
      )
    );
    if (stat === "fouls") {
    setSpursFouls(prevFoul => prevFoul + 1)
  }
}

  function addSpursFoul() {
    setSpursFouls(prev => prev + 1);
  }

  function addOpponentFoul() {
    setOpponentFouls(prev => prev + 1);
  }

  return (
    <main className="app">
      <section className="dashboard">
        <div className='header'>
          <div>
            <h1 className='title'>Spurs GameDay Dashboard</h1>
            <p className='subtitle'>Track the score, player stats, and game status.</p>
          </div>
            <img src={spursImage} alt='Spurs Logo' className='spursLogo'/>
        </div>

        <Scoreboard
          spursScore={spursScore}
          opponentScore={opponentScore}
          spursFouls={spursFouls}
          opponentFouls={opponentFouls}
          onAddSpursFoul={addSpursFoul}
          onAddOpponentFoul={addOpponentFoul}
          quarter={quarter === 0 ? "-" : quarter}
          gameStatus={gameStatus}
          onAddSpursPoints={addSpursPoints}
          onAddOpponentPoints={addOpponentPoints}
          onNextQuarter={ontoNextQuarter}
          onResetGame={resetGame}
          timeLeft={timeLeft}
          clockRunning={clockRunning}
          formatTime={formatTime}
          onStartClock={startClock}
          onStopClock={stopClock}
          onResetClock={resetClock}
        />
        <div className='contents'>
          <PlayerSelector
            players={players}
            leadingScorer={leadingScorer}
            selectedPlayerID={selectedPlayerId}
            onSelectPlayer={(id) => {
              setSelectedPlayerId(id);
            }}
          />
          <div className='rightSidePanel'>
            <PlayerCard
              player={selectedPlayer}
            />
            <StatControls
              selectedPlayer={selectedPlayer}
              onAddPoints={addPlayerPoints}
              onAddStats={addPlayerStats}
              onUndo={undoAction}
              canUndo={history.length > 0}
            />
          </div>
        </div>
          <div>
            <TeamSummary
              players={players}
              leadingScorer={leadingScorer}
              gameStatus={gameStatus}
            />
          </div>
      </section>
    </main>);
}






