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

  const [passedMen, setPassedMen] = useState(0);

  const startTheGame = () => {
    let manIdx = 0;
    let boxIdx = manIdx;
    let boxCounter = 0;

    const interval = setInterval(() => {
      setCurrentGameState({
        currentPrisoner: manIdx,
        passedPrisoners: passedMen,
      });

      console.log(`Man ${manIdx} looking into box ${boxIdx}`);
      const boxValue = boxes[boxIdx];
      const box = document.getElementById(`${boxIdx}-${boxValue}`);
      box?.scrollIntoView({
        behavior: "smooth",
      });
      // no need to update the dom if it's too fast to see from human eye
      if (cfg.intervalDur >= 100) {
        box?.setAttribute("data-active", "true");
      }

      if (manIdx === boxValue) {
        console.log(`Man ${manIdx} found his number inside box ${boxIdx}`);
        setPassedMen((p) => p + 1);
        manIdx++;
        boxIdx = manIdx;
        boxCounter = 0;
      } else {
        boxIdx = boxValue;
        boxCounter++;
      }

      // no need to update the dom if it's too fast to see from human eye
      if (cfg.intervalDur >= 100) {
        setTimeout(() => box?.removeAttribute("data-active"), cfg.intervalDur);
      }

      if (boxCounter > boxes.length / 2 || manIdx === boxes.length) {
        clearInterval(interval);
      }
    }, cfg.intervalDur);
  };

  return (
    <div className="main-page">
      <div
        className={`main-page__play ${
          boxes.length > 0 ? "main-page__play--active" : ""
        }`}
      >
        <h1>The 100 Prisoners Riddle / N wise men problem</h1>

        <div className="main-page__play__boxes">
          <div className="main-page__play__boxes__grid">
            {boxes.map((box, index) => (
              <div
                key={index}
                id={`${index}-${box}`}
                className="main-page__play__boxes__grid__box"
              >
                {box}
                <div className="main-page__play__boxes__grid__box__cover">
                  {index}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Settings
        submitConfig={handleConfigChange}
        currentGameState={currentGameState}
        startTheGame={startTheGame}
      />
      <Footer />
    </div>
  );
};
