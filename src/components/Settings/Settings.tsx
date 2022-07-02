import { useState } from "react";
import { ProblemCfg, GameState } from "../../types";
import { VerticalDivider } from "../Divider/Divider";
import "./Settings.scss";

interface SettingsProps {
  submitConfig: (config: ProblemCfg) => void;
  gameState: GameState;
  currentPrisoner: number;
  startTheGame: () => void;
  reStartTheGame: () => void;
}

export const Settings: React.FC<SettingsProps> = ({
  submitConfig,
  gameState,
  currentPrisoner,
  startTheGame,
  reStartTheGame,
}) => {
  const initialCfg: ProblemCfg = {
    noOfMen: 0,
    intervalDur: 300,
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

  return (
    <div className="settings">
      <h3>Settings</h3>
      <div className="settings__row">
        <div className="settings__row__item">
          <span>No. of prisoners</span>
          <input
            type="number"
            value={cfg.noOfMen}
            onChange={handleNoOfMenChange}
          />
        </div>
        <div className="settings__row__item">
          <span>Animation delay</span>
          <input
            type="number"
            value={cfg.intervalDur}
            onChange={handleIntervalDurChange}
          />
        </div>

        <VerticalDivider />

        <div className="settings__row__item">
          <span>Current Prisoner</span>
          <p>{currentPrisoner}</p>
        </div>

        <VerticalDivider />

        <div className="settings__row__controls">
          <button onClick={startTheGame}>Start</button>
          <button onClick={reStartTheGame}>Randomize & Restart</button>
        </div>
      </div>
    </div>
  );
};
