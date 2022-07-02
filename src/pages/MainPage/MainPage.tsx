import { useState } from "react";
import { Footer, Play, ProblemConfig } from "../../components";
import { ProblemCfg } from "../../types";
import { createRandomArray } from "../../utils";

import "./MainPage.scss";

export const MainPage: React.FC = () => {
  const [cfg, setCfg] = useState<ProblemCfg>({
    intervalDur: 1000,
    noOfMen: 0,
  });
  const [boxes, setBoxes] = useState<Array<number>>([]);

  const handleConfigChange = (config: ProblemCfg) => {
    setCfg(config);
    setBoxes(createRandomArray(config.noOfMen));
  };

  return (
    <div className="main-page">
      <div className="main-page__main">
        <ProblemConfig submitConfig={handleConfigChange} />
        <Play boxes={boxes} intervalDur={cfg.intervalDur} />
      </div>
      <Footer />
    </div>
  );
};
