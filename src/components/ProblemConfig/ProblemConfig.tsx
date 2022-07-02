import { useState } from "react";
import { ProblemCfg } from "../../types";
import "./ProblemConfig.scss";

interface ProblemConfigProps {
  submitConfig: (config: ProblemCfg) => void;
}

export const ProblemConfig: React.FC<ProblemConfigProps> = ({
  submitConfig,
}) => {
  const initialCfg: ProblemCfg = {
    noOfMen: 0,
    intervalDur: 1000,
  };

  const [cfg, setCfg] = useState<ProblemCfg>(initialCfg);

  const handleNoOfMenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCfg({
      ...cfg,
      noOfMen: parseInt(event.target.value, 10),
    });
  };

  const handleIntervalDurChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCfg({
      ...cfg,
      intervalDur: parseInt(event.target.value, 10),
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    submitConfig(cfg);
  };

  const reset = () => {
    setCfg(initialCfg);

    submitConfig(initialCfg);
  };

  // contenteditable html input like this with slider
  // https://hihayk.github.io/scale/#4/6/50/80/-51/67/20/14000/1D9A6C/29/154/108/white
  return (
    <div className="problem-config">
      <h1>Config</h1>

      <div className="problem-config__form">
        <form onSubmit={handleSubmit}>
          <h4>No. of prisoners</h4>
          <input
            type="number"
            placeholder="No. of men"
            value={cfg.noOfMen}
            onChange={handleNoOfMenChange}
          />
          <h4>Interval duration (ms)</h4>
          <input
            type="number"
            placeholder="Interval duration (ms)"
            value={cfg.intervalDur}
            onChange={handleIntervalDurChange}
          />
          <button type="submit">Create Data</button>
        </form>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};
