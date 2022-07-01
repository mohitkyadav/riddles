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
  };

  const [cfg, setCfg] = useState<ProblemCfg>(initialCfg);

  const handleNoOfMenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCfg({
      noOfMen: parseInt(event.target.value),
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

  return (
    <div className="problem-config">
      <h1>Problem config</h1>

      <div className="problem-config__form">
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="No. of men"
            onChange={handleNoOfMenChange}
          />
          <button type="submit">Play</button>
        </form>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};
