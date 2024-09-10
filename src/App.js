import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

import playIcon from './assets/play.png';
import raceIcon from './assets/race.png';
import earnIcon from './assets/earn.png';
import friendsIcon from './assets/friends.png';
import airdropIcon from './assets/airdrop.png';
import beraImage from './assets/berajet.png';
import astroidImage from './assets/astroid.png';
import FriendsPage from './Friends';
import berajet2 from './assets/berajet2.png';
import berajet3 from './assets/berajet3.png';

const GAME_WIDTH = 600;
const GAME_HEIGHT = 200;
const BERA_WIDTH = 80;
const BERA_HEIGHT = 40;
const ASTROID_WIDTH = 40;
const ASTROID_HEIGHT = 40;

function GameComponent() {
  const [beraBottom, setBeraBottom] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [astroidLeft, setAstroidLeft] = useState(GAME_WIDTH);
  const [bucks, setBucks] = useState(0);
  const [totalBucks, setTotalBucks] = useState(0);
  const [maxWin, setMaxWin] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [astroidPassed, setAstroidPassed] = useState(false);
  const [lastBucks, setLastBucks] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [playerName, setPlayerName] = useState("John Doe");
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [beraImageSrc, setBeraImageSrc] = useState(berajet2);
  const [playerRank, setPlayerRank] = useState(0);
  const [jumpCount, setJumpCount] = useState(0);
  const [bucksPerJump, setBucksPerJump] = useState(1);
  const [nextMilestone, setNextMilestone] = useState(10);
  const gameContainerRef = useRef(null);
  const bottomNavbarRef = useRef(null);
  const [imageToggle, setImageToggle] = useState(true);

  const navigate = useNavigate();

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setBucks(0);
    setLastBucks(0);
    setAstroidLeft(GAME_WIDTH);
    setBeraBottom(0);
    setAstroidPassed(false);
    setBeraImageSrc(berajet2); // Use berajet2 as the initial image
    setJumpCount(0);
    setBucksPerJump(1);
    setNextMilestone(10);
  };

  const calculateBucks = (jumps) => {
    let totalBucks = 0;
    let currentBucksPerJump = 1;

    for (let i = 0; i < Math.floor(jumps / 10); i++) {
      for (let j = 0; j < 10; j++) {
        totalBucks += currentBucksPerJump;
      }
      currentBucksPerJump *= 2;
    }

    for (let j = 0; j < jumps % 10; j++) {
      totalBucks += currentBucksPerJump;
    }

    return totalBucks;
  };

  const jump = useCallback(() => {
    if (!isJumping && gameStarted && !gameOver) {
      setIsJumping(true);
      let jumpCount = 0;
      const jumpInterval = setInterval(() => {
        const gravity = 0.2; // Reduced gravity value for slower fall
        const jumpHeight = 300;
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

  const calculateNextMilestone = useCallback((currentJumps) => {
    const currentSet = Math.floor(currentJumps / 10);
    const baseScore = 10 * (Math.pow(2, currentSet) - 1);
    return baseScore + 10 * Math.pow(2, currentSet);
  }, []);

  useEffect(() => {
    setNextMilestone(calculateNextMilestone(jumpCount));
  }, [jumpCount, calculateNextMilestone]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const gameInterval = setInterval(() => {
        setAstroidLeft((prevLeft) => {
          if (prevLeft <= -ASTROID_WIDTH) {
            if (!astroidPassed && beraBottom > 0) {
              setJumpCount(prevCount => {
                const newCount = prevCount + 1;
                const newBucks = calculateBucks(newCount) - calculateBucks(prevCount);
                setBucks(prevBucks => prevBucks + newBucks);
                setBucksPerJump(Math.pow(2, Math.floor(newCount / 10)));
                return newCount;
              });
            }
            setAstroidPassed(false);
            return GAME_WIDTH;
          }
          return prevLeft - 5;
        });

        const beraLeft = 50;
        const beraRight = beraLeft + BERA_WIDTH;
        const astroidRight = astroidLeft + ASTROID_WIDTH;

        if (
          beraRight > astroidLeft &&
          beraLeft < astroidRight &&
          beraBottom < ASTROID_HEIGHT
        ) {
          setGameOver(true);
          setGameStarted(false);
          setShowPopup(true);

          setTimeout(() => {
            setShowPopup(false);
          }, 1000);
        }

        if (astroidLeft < beraLeft && !astroidPassed && beraBottom > 0) {
          setAstroidPassed(true);
          setJumpCount(prevCount => {
            const newCount = prevCount + 1;
            const newBucks = calculateBucks(newCount) - calculateBucks(prevCount);
            setBucks(prevBucks => prevBucks + newBucks);
            setBucksPerJump(Math.pow(2, Math.floor(newCount / 10)));
            return newCount;
          });
        }
      }, 20);

      return () => clearInterval(gameInterval);
    }
  }, [astroidLeft, beraBottom, gameOver, gameStarted, astroidPassed, calculateBucks]);

  useEffect(() => {
    if (bucks > lastBucks) {
      setTotalBucks((prevTotal) => prevTotal + (bucks - lastBucks));
      setMaxWin((prevMax) => Math.max(prevMax, bucks));
      setLastBucks(bucks);
    }
  }, [bucks, lastBucks]);

  useEffect(() => {
    if (gameOver) {
      setBeraImageSrc(berajet2); // Set to berajet2 after game over
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

  useEffect(() => {
    let imageInterval;
    if (gameStarted && !gameOver) {
      imageInterval = setInterval(() => {
        setImageToggle(prev => !prev);
        setBeraImageSrc(prev => prev === berajet2 ? berajet3 : berajet2); // Toggle image source
      }, 250);
    }

    return () => clearInterval(imageInterval);
  }, [gameStarted, gameOver, imageToggle]);

  return (
    <div className="App" style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif" }}>
      <div className="game-wrapper">
        <div className="parallax-bg">
          <div className="stars"></div>
          <div className="clouds"></div>
          <div className="twinkling"></div> // Added twinkling effect back here
      <div className="header">
        <h1 className="header-title">BERA BUCKS</h1>
      </div>
      <div className="player-name-container">
        <span className="player-name-text">{playerName}</span>
      </div>
      <div className="total-coins-container">
        <div className="coins-info">
          <img src={airdropIcon} alt="Airdrop" className="airdrop-icon" />
          <span className="total-coins"><span style={{ color: '#00ffff' }}>{totalBucks}</span></span>
        </div>
        <div className="max-win-container">
          <span className="max-win-text">Max Win: <span style={{ color: '#00ffff' }}>{maxWin}</span></span>
        </div>
      </div>
      <div className="game-container" ref={gameContainerRef}>
        <div className="game-stats">
          <div className="bucks-display">
            <img src={airdropIcon} alt="Airdrop" className="airdrop-icon" />
            <span>{bucks}</span>
          </div>
          <span className="next-milestone-hint" style={{ color: '#ff00ff', textShadow: '0 0 10px #ff00ff' }}>Next Milestone: <span style={{ color: '#00ffff' }}>{nextMilestone}</span></span>
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
          src={astroidImage}
          alt="Astroid"
          className={`astroid ${gameStarted && !gameOver ? 'rotating' : ''}`} // Apply rotating class conditionally
          style={{
            left: astroidLeft,
            width: ASTROID_WIDTH,
            height: ASTROID_HEIGHT,
            position: 'absolute',
            bottom: '0',
          }}
        />
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
      </div>
      {showPopup && (
        <div className="popup">
          <div style={{color:'red', fontWeight:'bold'}}>Game Over!</div>
          <div style={{color:'#fff'}}>Bucks: {bucks}</div>
        </div>
      )}

      {showLeaderboard && (
        <div className="leaderboard-popup">
          <h2>Leaderboard</h2>
          <span className="close-icon" onClick={toggleLeaderboard}>&times;</span>
          <div className="player-info">
            <table>
              <tr>
                <td style={{ color: '#ff00ff' }}>Name: <span style={{ color: '#00ffff' }}>{playerName}</span></td>
                <td style={{ color: '#ff00ff' }}>Rank: <span style={{ color: '#00ffff' }}>{playerRank}</span></td>
                <td style={{ color: '#ff00ff' }}>MaxWin: <span style={{ color: '#00ffff' }}>{maxWin}</span></td>
              </tr>
            </table>
          </div>
          <div className="leaderboard-table-container" style={{ overflowY: 'hidden' }}>
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>MaxWin</th>
                </tr>
              </thead>
            </table>
            <div className="leaderboard-table-body-container" style={{ maxHeight: '300px', overflowY: 'auto' }}>
              <table className="leaderboard-table">
                <tbody>
                  {generateLeaderboardRecords().map((record, index) => (
                    <tr key={index}>
                      <td>{record.rank}</td>
                      <td>{record.name}</td>
                      <td>{record.maxWin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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