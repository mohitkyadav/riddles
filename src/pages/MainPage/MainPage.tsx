import { Play, ProblemConfig } from "../../components";
import { ProblemCfg } from "../../types";
import { createRandomArray } from "../../utils";

import "./MainPage.scss";

export const MainPage: React.FC = () => {
  const handleConfigChange = (config: ProblemCfg) => {
    console.log(config);

    console.log(
      "🚀 ~ file: MainPage.tsx ~ line 12 ~ handleConfigChange ~ createRandomArray(config.noOfMen);",
      createRandomArray(config.noOfMen)
    );
    createRandomArray(config.noOfMen);
  };

  return (
    <div className="main-page">
      <ProblemConfig submitConfig={handleConfigChange} />
      <Play />
    </div>
  );
};
