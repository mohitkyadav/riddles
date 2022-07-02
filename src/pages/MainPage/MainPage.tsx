import { useState } from "react";
import { Footer, Settings } from "../../components";
import { ProblemCfg, GameState } from "../../types";
import { createRandomArray } from "../../utils";

import "./MainPage.scss";

export const MainPage: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    totalGames: 0,
    passedGames: 0,
  });
  const [currentPrisoner, setCurrentPrisoner] = useState<number>(0);
  const [cfg, setCfg] = useState<ProblemCfg>({
    intervalDur: 300,
    noOfMen: 0,
  });
  const [boxes, setBoxes] = useState<Array<number>>([]);

  const handleConfigChange = (config: ProblemCfg) => {
    setCfg(config);
    setBoxes(createRandomArray(config.noOfMen));
  };

  const startTheGame = async () => {
    let manIdx = 0;
    let boxIdx = manIdx;
    let boxCounter = 0;

    while (manIdx < boxes.length && boxCounter < boxes.length / 2) {
      setCurrentPrisoner(manIdx);
      console.log(`Man ${manIdx} looking into box ${boxIdx}`);
      const boxValue = boxes[boxIdx];
      const box = document.getElementById(`${boxIdx}-${boxValue}`);

      if (cfg.intervalDur >= 300) {
        box?.scrollIntoView({
          behavior: "smooth",
        });
      }
      // no need to update the dom if it's too fast to see from human eye
      if (cfg.intervalDur >= 100) {
        box?.setAttribute("data-active", "true");
      }

      if (manIdx === boxValue) {
        console.log(`Man ${manIdx} found his number inside box ${boxIdx}`);
        await new Promise((r) => setTimeout(r, cfg.intervalDur));
        manIdx++;
        boxIdx = manIdx;
        boxCounter = 0;
      } else {
        await new Promise((r) => setTimeout(r, cfg.intervalDur));
        boxIdx = boxValue;
        boxCounter++;
      }

      // no need to update the dom if it's too fast to see from human eye
      if (cfg.intervalDur >= 100) {
        box?.removeAttribute("data-active");
      }

      if (boxCounter >= boxes.length / 2) {
        alert("Game over, failed on prisoner " + manIdx);
      }

      if (manIdx === boxes.length) {
        alert("All prisoners found their number");
      }
    }
  };

  const reStartTheGame = () => {
    for (var i = 1; i < 999; i++) window.clearInterval(i);

    setGameState({
      totalGames: 0,
      passedGames: 0,
    });
    setCurrentPrisoner(0);
    setBoxes(createRandomArray(cfg.noOfMen));
    startTheGame();
  };

  return (
    <div className="main-page">
      <div className="main-page__play">
        <h1>The 100 Prisoners Riddle / N wise men problem</h1>

        <div className="main-page__play__boxes">
          <div className="main-page__play__boxes__grid">
            {boxes.map((box, index) => (
              <div
                key={`${index}-${box}`}
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
        gameState={gameState}
        currentPrisoner={currentPrisoner}
        startTheGame={startTheGame}
        reStartTheGame={reStartTheGame}
      />
      <Footer />
    </div>
  );
};
