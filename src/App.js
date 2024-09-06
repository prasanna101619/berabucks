import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

import playIcon from './assets/play.png';
import raceIcon from './assets/race.png';
import earnIcon from './assets/earn.png';
import friendsIcon from './assets/friends.png';
import airdropIcon from './assets/airdrop.png';
import beraImage from './assets/bera.png';
import beraGif from './assets/bera.gif';
import cactusImage from './assets/cactus.png';
import FriendsPage from './Friends';

const GAME_WIDTH = 600;
const GAME_HEIGHT = 200;
const BERA_WIDTH = 40;
const BERA_HEIGHT = 60;
const CACTUS_WIDTH = 20;
const CACTUS_HEIGHT = 40;

function GameComponent() {
  const [beraBottom, setBeraBottom] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [cactusLeft, setCactusLeft] = useState(GAME_WIDTH);
  const [bucks, setBucks] = useState(0);
  const [totalBucks, setTotalBucks] = useState(0);
  const [maxWin, setMaxWin] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [cactusPassed, setCactusPassed] = useState(false);
  const [lastBucks, setLastBucks] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [playerName, setPlayerName] = useState("John Doe");
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [beraImageSrc, setBeraImageSrc] = useState(beraImage);
  const [playerRank, setPlayerRank] = useState(0);
  const gameContainerRef = useRef(null);
  const bottomNavbarRef = useRef(null);

  const navigate = useNavigate();

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setBucks(0);
    setLastBucks(0);
    setCactusLeft(GAME_WIDTH);
    setBeraBottom(0);
    setCactusPassed(false);
    setBeraImageSrc(beraGif);
  };

  const jump = useCallback(() => {
    if (!isJumping && gameStarted && !gameOver) {
      setIsJumping(true);
      let jumpCount = 0;
      const jumpInterval = setInterval(() => {
        const gravity = 5;
        const jumpHeight = 160;
        const jumpIncrement = jumpHeight / 60;

        if (jumpCount >= 20) {
          clearInterval(jumpInterval);
          setIsJumping(false);
          setBeraBottom(0);
        } else {
          const position =
            (jumpHeight - jumpCount * jumpIncrement) *
            Math.sin((jumpCount * Math.PI) / 20);
          setBeraBottom((prevBottom) => Math.max(position, 0));
          jumpCount++;
        }
      }, 40);
    }
  }, [isJumping, gameStarted, gameOver]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space') {
        jump();
      }
    };

    const handleTouchStart = (event) => {
      if (!bottomNavbarRef.current.contains(event.target)) {
        jump();
      }
    };

    const handleClick = (event) => {
      if (!bottomNavbarRef.current.contains(event.target)) {
        jump();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('click', handleClick);
    };
  }, [jump]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const gameInterval = setInterval(() => {
        setCactusLeft((prevLeft) => {
          if (prevLeft <= -CACTUS_WIDTH) {
            setCactusPassed(false);
            return GAME_WIDTH;
          }
          return prevLeft - 5;
        });

        const beraLeft = 50;
        const beraRight = beraLeft + BERA_WIDTH;
        const cactusRight = cactusLeft + CACTUS_WIDTH;

        if (
          beraRight > cactusLeft &&
          beraLeft < cactusRight &&
          beraBottom < CACTUS_HEIGHT
        ) {
          setGameOver(true);
          setGameStarted(false);
          setShowPopup(true);

          setTimeout(() => {
            setShowPopup(false);
          }, 1000); // Changed from 3000 to 500 milliseconds
        }

        if (cactusLeft < 0 && !cactusPassed) {
          setBucks((prevBucks) => prevBucks + 1);
          setCactusPassed(true);
        }
      }, 20);

      return () => clearInterval(gameInterval);
    }
  }, [cactusLeft, beraBottom, gameOver, gameStarted, cactusPassed]);

  useEffect(() => {
    if (bucks > lastBucks) {
      setTotalBucks((prevTotal) => prevTotal + (bucks - lastBucks));
      setMaxWin((prevMax) => Math.max(prevMax, bucks));
      setLastBucks(bucks);
    }
  }, [bucks, lastBucks]);

  useEffect(() => {
    if (gameOver) {
      setBeraImageSrc(beraImage);
    }
  }, [gameOver]);

  const calculatePlayerRank = () => {
    const allScores = generateLeaderboardRecords().map(record => record.maxWin);
    const playerRank = allScores.filter(score => score > maxWin).length + 1;
    setPlayerRank(playerRank);
  };

  const toggleLeaderboard = () => {
    if (!showLeaderboard) {
      calculatePlayerRank();
    }
    setShowLeaderboard(!showLeaderboard);
  };

  const handleNavClick = (option) => {
    if (option === 'play') {
      navigate('/');
    } else if (option === 'friends') {
      navigate('/friends');
    } else if (option === 'earn' || option === 'race' || option === 'airdrop') {
      setShowComingSoon(true);
      setTimeout(() => {
        setShowComingSoon(false);
      }, 2000);
    }
  };

  const leaderboardData = [
    { rank: 1, name: "Alice", maxWin: 100 },
    { rank: 2, name: "Bob", maxWin: 90 },
    { rank: 3, name: "Charlie", maxWin: 80 },
    { rank: 4, name: "David", maxWin: 70 },
    { rank: 5, name: "Eve", maxWin: 0 },
  ];

  const generateLeaderboardRecords = () => {
    let records = [];
    for (let i = 0; i < 20; i++) {
      records = records.concat(leaderboardData.map(record => ({
        ...record,
        rank: record.rank + i * 5
      })));
    }
    return records.slice(0, 100);
  };

  return (
    <div className="App" style={"font-family='Comic Sans MS', Arial, sans-serif;"}>
      <div className="player-name-container">
        <span className="player-name-text">Player Name: {playerName}</span>
      </div>
      <div 
        className="game-container" 
        ref={gameContainerRef}
      >
        <div className="game-stats">
          <img src={airdropIcon} alt="Airdrop" className="airdrop-icon" />
          <span>{bucks}</span>
        </div>
        <img
          src={beraImageSrc}
          alt="Bera"
          className="bera"
          style={{
            bottom: beraBottom,
            width: BERA_WIDTH,
            height: BERA_HEIGHT,
            position: 'absolute',
            left: '50px',
          }}
        />
        <img
          src={cactusImage}
          alt="Cactus"
          className="cactus"
          style={{
            left: cactusLeft,
            width: CACTUS_WIDTH,
            height: CACTUS_HEIGHT,
            position: 'absolute',
            bottom: '0',
          }}
        />
      </div>
      <div className="game-stats-container">
        <div className="stat-item">
          <span>Total no. of Bucks: {totalBucks}</span>
          <span>Max Win: {maxWin}</span>
        </div>
      </div>
      {!gameStarted && !showPopup && (
        <div className="menu-buttons">
          <button className="start-game-button" onClick={startGame}>
            Start Game
          </button>
          <button className="leaderboard-button" onClick={toggleLeaderboard}>
            Leaderboard
          </button>
        </div>
      )}

      {showPopup && (
        <div className="popup">
          <div>Game Over!</div>
          <div>Bucks: {bucks}</div>
        </div>
      )}

      {showLeaderboard && (
        <div className="leaderboard-popup" style={{ width: GAME_WIDTH }}>
          <h2>Leaderboard</h2>
          <span 
            className="close-icon" 
            onClick={toggleLeaderboard}
          >
            &times;
          </span>
          <div className="player-info">
            <div>Name: {playerName}</div>
            <div>Rank: {playerRank}</div>
            <div>MaxWin: {maxWin}</div>
          </div>

          <div className="leaderboard-header">
            <span>Rank</span>
            <span>Name</span>
            <span>MaxWin</span>
          </div>
          <div className="leaderboard-table">
            {generateLeaderboardRecords().map((record, index) => (
              <div key={index} className="leaderboard-row">
                <span>{record.rank}</span>
                <span>{record.name}</span>
                <span>{record.maxWin}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="bottom-navbar" ref={bottomNavbarRef}>
        <div className="nav-item" onClick={() => handleNavClick('play')}>
          <img src={playIcon} alt="Play" />
          <span>Play</span>
        </div>
        <div className="nav-item" onClick={() => handleNavClick('race')}>
          <img src={raceIcon} alt="Race" />
          <span>Race</span>
        </div>
        <div className="nav-item" onClick={() => handleNavClick('earn')}>
          <img src={earnIcon} alt="Earn" />
          <span>Earn</span>
        </div>
        <div className="nav-item" onClick={() => handleNavClick('friends')}>
          <img src={friendsIcon} alt="Friends" />
          <span>Friends</span>
        </div>
        <div className="nav-item" onClick={() => handleNavClick('airdrop')}>
          <img src={airdropIcon} alt="Airdrop" />
          <span>Airdrop</span>
        </div>
      </div>

      {showComingSoon && (
        <div className="popup coming-soon">
          <div>Coming Soon!</div>
        </div>
      )}

    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameComponent />} />
        <Route path="/friends" element={<FriendsPage />} />
      </Routes>
    </Router>
  );
}

export default App;