import React from 'react';
import './GameSettings.css';

function GameSettings({ difficulty, setDifficulty, gameMode, setGameMode, startGame }) {
  return (
    <div className="game-settings">
      <h2>Game Settings</h2>
      <div className="setting-group">
        <label>Difficulty:</label>
        <div className="button-group">
          {['easy', 'medium', 'hard'].map((level) => (
            <button
              key={level}
              className={`setting-button ${difficulty === level ? 'active' : ''}`}
              onClick={() => setDifficulty(level)}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="setting-group">
        <label>Game Mode:</label>
        <div className="button-group">
          {['endless', 'timeAttack', 'obstacleRun'].map((mode) => (
            <button
              key={mode}
              className={`setting-button ${gameMode === mode ? 'active' : ''}`}
              onClick={() => setGameMode(mode)}
            >
              {mode === 'timeAttack' ? 'Time Attack' : mode === 'obstacleRun' ? 'Obstacle Run' : 'Endless'}
            </button>
          ))}
        </div>
      </div>
      <button className="start-game-button" onClick={startGame}>Start Game</button>
    </div>
  );
}

export default GameSettings;
