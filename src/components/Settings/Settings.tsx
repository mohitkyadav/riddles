import { useState } from "react";
import { ProblemCfg, CurrentGameState } from "../../types";
import { VerticalDivider } from "../Divider/Divider";
import "./Settings.scss";

interface SettingsProps {
  submitConfig: (config: ProblemCfg) => void;
  currentGameState: CurrentGameState;
}

export const Settings: React.FC<SettingsProps> = ({
  submitConfig,
  currentGameState,
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
          <p>{currentGameState.currentPrisoner + 1}</p>
        </div>

        <div className="settings__row__item">
          <span>Passed Prisoner</span>
          <p>{currentGameState.passedPrisoners}</p>
        </div>
      </div>
    </div>
  );
};
