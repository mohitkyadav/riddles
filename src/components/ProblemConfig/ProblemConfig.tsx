import { useState } from "react";
import { ProblemCfg } from "../../types";
import "./ProblemConfig.scss";

interface ProblemConfigProps {
  submitConfig: (config: ProblemCfg) => void;
}

export const ProblemConfig: React.FC<ProblemConfigProps> = ({
  submitConfig,
}) => {
  const [cfg, setCfg] = useState<ProblemCfg>({
    noOfMen: 0,
  });

  const handleNoOfMenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCfg({
      noOfMen: parseInt(event.target.value),
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    submitConfig(cfg);
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
      </div>
    </div>
  );
};
