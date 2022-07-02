import { useState } from "react";
import { Footer, Play, Settings } from "../../components";
import { ProblemCfg, CurrentGameState } from "../../types";
import { createRandomArray } from "../../utils";

import "./MainPage.scss";

export const MainPage: React.FC = () => {
  const [currentGameState, setCurrentGameState] = useState<CurrentGameState>({
    currentPrisoner: 0,
    passedPrisoners: 0,
  });
  const [cfg, setCfg] = useState<ProblemCfg>({
    intervalDur: 300,
    noOfMen: 0,
  });
  const [boxes, setBoxes] = useState<Array<number>>([]);

  const handleConfigChange = (config: ProblemCfg) => {
    setCfg(config);
    setBoxes(createRandomArray(config.noOfMen));
  };

  return (
    <div className="main-page">
      <Play
        boxes={boxes}
        intervalDur={cfg.intervalDur}
        setCurrentGameState={setCurrentGameState}
      />
      <Settings
        submitConfig={handleConfigChange}
        currentGameState={currentGameState}
      />
      <Footer />
    </div>
  );
};
