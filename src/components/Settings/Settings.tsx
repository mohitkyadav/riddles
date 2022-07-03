import { useState } from "react";
import { ProblemCfg, GameState } from "../../types";
import { VerticalDivider } from "../Divider/Divider";
import "./Settings.scss";

interface SettingsProps {
  submitConfig: (config: ProblemCfg) => void;
  gameState: GameState;
  currentPrisoner: number;
  currentIteration: number;
  startGame: () => void;
  resetGame: () => void;
  gameRunning: boolean;
}

export const Settings: React.FC<SettingsProps> = ({
  submitConfig,
  gameState,
  currentPrisoner,
  currentIteration,
  startGame,
  resetGame,
  gameRunning,
}) => {
  const initialCfg: ProblemCfg = {
    noOfMen: 0,
    intervalDur: 300,
    noOfIterations: 1,
  };

  const [cfg, setCfg] = useState<ProblemCfg>(initialCfg);

  const handleNoOfMenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCfg: ProblemCfg = {
      ...cfg,
      noOfMen: parseInt(event.target.value, 10),
    };
    setCfg(newCfg);
    submitConfig(newCfg);
  };

  const handleIntervalDurChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newCfg: ProblemCfg = {
      ...cfg,
      intervalDur: parseInt(event.target.value, 10),
    };
    setCfg(newCfg);
    submitConfig(newCfg);
  };

  const handleNoOfIterationsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newCfg: ProblemCfg = {
      ...cfg,
      noOfIterations: parseInt(event.target.value, 10),
    };
    setCfg(newCfg);
    submitConfig(newCfg);
  };

  return (
    <div className="settings animation-slide-down">
      <h3>Settings</h3>
      <div className="settings__row">
        <div className="settings__row__item">
          <span>Iterations</span>
          <input
            type="number"
            value={cfg.noOfIterations}
            disabled={gameRunning}
            min={1}
            onChange={handleNoOfIterationsChange}
          />
        </div>
        <div className="settings__row__item">
          <span>No. of prisoners</span>
          <input
            type="number"
            value={cfg.noOfMen}
            disabled={gameRunning}
            onChange={handleNoOfMenChange}
          />
        </div>
        <div className="settings__row__item">
          <span>Animation delay</span>
          <input
            type="number"
            value={cfg.intervalDur}
            disabled={gameRunning}
            onChange={handleIntervalDurChange}
          />
        </div>

        <VerticalDivider />

        <div className="settings__row__item">
          <span>Current Iteration</span>
          <p>{gameRunning ? currentIteration + 1 : "-"}</p>
        </div>

        <div className="settings__row__item">
          <span>Current Prisoner</span>
          <p>{gameRunning ? currentPrisoner + 1 : "-"}</p>
        </div>

        <VerticalDivider />

        <div className="settings__row__controls">
          <button
            onClick={() => startGame()}
            disabled={gameRunning || cfg.noOfMen <= 0}
          >
            Start
          </button>
          <button
            onClick={resetGame}
            disabled={gameRunning || cfg.noOfMen <= 0}
          >
            Reset
          </button>
        </div>

        <VerticalDivider />

        <div className="settings__row__item">
          <span>Observed Win Probability</span>
          <p>
            {gameState.totalGames
              ? gameState.passedGames / gameState.totalGames
              : 0}
          </p>
        </div>
      </div>
    </div>
  );
};
