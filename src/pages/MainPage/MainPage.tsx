import { useState } from "react";
import { Play, ProblemConfig } from "../../components";
import { ProblemCfg } from "../../types";
import { createRandomArray } from "../../utils";

import "./MainPage.scss";

export const MainPage: React.FC = () => {
  const [boxes, setBoxes] = useState<Array<number>>([]);

  const handleConfigChange = (config: ProblemCfg) => {
    setBoxes(createRandomArray(config.noOfMen));
  };

  return (
    <div className="main-page">
      <ProblemConfig submitConfig={handleConfigChange} />
      <Play boxes={boxes} />
    </div>
  );
};
