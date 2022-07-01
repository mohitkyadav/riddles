import { Play, ProblemConfig } from "../../components";
import { ProblemCfg } from "../../types";

import "./MainPage.scss";

export const MainPage: React.FC = () => {
  const handleConfigChange = (config: ProblemCfg) => {
    console.log(config);
  };

  return (
    <div className="main-page">
      <ProblemConfig submitConfig={handleConfigChange} />
      <Play />
    </div>
  );
};
