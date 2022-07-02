import { useState } from "react";
import { Box, Footer, Settings, Console } from "../../components";
import { ProblemCfg, GameState } from "../../types";
import { createRandomArray } from "../../utils";

import "./MainPage.scss";

export const MainPage: React.FC = () => {
  const [gameRunning, setGameRunning] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    totalGames: 0,
    passedGames: 0,
  });
  const [currentPrisoner, setCurrentPrisoner] = useState<number>(0);
  const [cfg, setCfg] = useState<ProblemCfg>({
    intervalDur: 300,
    noOfMen: 0,
  });
  const [boxes, setBoxes] = useState<number[]>([]);
  const [logs, setLogs] = useState<string[]>([]);

  const handleConfigChange = (config: ProblemCfg) => {
    setCfg(config);
    setBoxes(createRandomArray(config.noOfMen));
  };

  const startTheGame = async (newBoxes = boxes) => {
    let manIdx = 0;
    let boxIdx = manIdx;
    let boxCounter = 0;
    setGameRunning(true);

    while (
      manIdx < newBoxes.length &&
      boxCounter <= Math.floor(newBoxes.length / 2)
    ) {
      setCurrentPrisoner(manIdx);

      const boxValue = newBoxes[boxIdx];
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
        setLogs((logs) => [
          ...logs,
          `Man ${manIdx} found his number inside box ${boxIdx}`,
        ]);
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

      if (boxCounter >= newBoxes.length / 2) {
        setGameRunning(false);
        setGameState((gameState) => ({
          ...gameState,
          totalGames: gameState.totalGames + 1,
        }));
        alert("Game over, failed on prisoner " + manIdx);
        break;
      }

      if (manIdx === newBoxes.length) {
        setGameRunning(false);
        setGameState((gameState) => ({
          ...gameState,
          totalGames: gameState.totalGames + 1,
          passedGames: gameState.passedGames + 1,
        }));
        alert("All prisoners found their number");
        break;
      }
    }
  };

  const reStartTheGame = async () => {
    setGameState({
      totalGames: 0,
      passedGames: 0,
    });

    const newBoxes = createRandomArray(cfg.noOfMen);
    setBoxes(newBoxes);
    await startTheGame(newBoxes);
  };

  return (
    <div className="main-page">
      <div className="main-page__play animation-slide-down">
        <h1>The 100 Prisoners Riddle / N wise men problem</h1>

        <div className="main-page__play__boxes">
          <div className="main-page__play__boxes__grid">
            {boxes.map((box, index) => (
              <Box key={`${box}-${index}`} number={box} index={index} />
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
        gameRunning={gameRunning}
      />
      <Footer />
      <Console logs={logs} />
    </div>
  );
};
