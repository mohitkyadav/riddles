import { useRef, useState } from "react";
import { Box, Footer, Settings, Console } from "../../components";
import { ProblemCfg, GameState } from "../../types";
import { createRandomArray, sleep } from "../../utils";

import "./PrisonerRiddle.scss";

const defaultPosFloatingPrisoner = -100;

const initialCfg: ProblemCfg = {
  intervalDur: 300,
  noOfMen: 0,
  noOfIterations: 1,
};

export const PrisonerRiddle: React.FC = () => {
  const floatingPrisonerRef = useRef<HTMLDivElement>(null);
  const [gameRunning, setGameRunning] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    totalGames: 0,
    passedGames: 0,
  });
  const [currentPrisoner, setCurrentPrisoner] = useState<number>(0);
  const [currentIteration, setCurrentIteration] = useState<number>(0);
  const [cfg, setCfg] = useState<ProblemCfg>(initialCfg);
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
    await sleep(cfg.intervalDur * 2);

    const floatingPrisoner = floatingPrisonerRef.current;

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

        if (box && floatingPrisoner) {
          floatingPrisoner.style.opacity = "1";
          floatingPrisoner.style.left = `${box.offsetLeft}px`;
          floatingPrisoner.style.top = `${box.offsetTop + 45}px`;
          floatingPrisoner.style.width = `${box.offsetWidth}px`;
        }
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
        await sleep(cfg.intervalDur * 2);
        manIdx++;
        boxIdx = manIdx;
        boxCounter = 0;
      } else {
        await sleep(cfg.intervalDur);
        boxIdx = boxValue;
        boxCounter++;
      }

      // no need to update the dom if it's too fast to see from human eye
      if (cfg.intervalDur >= 100) {
        box?.removeAttribute("data-active");
      }

      if (boxCounter >= newBoxes.length / 2) {
        setGameRunning(false);

        if (floatingPrisoner) {
          floatingPrisoner.style.opacity = "0";
          floatingPrisoner.style.left = `${defaultPosFloatingPrisoner}px`;
        }
        setCurrentPrisoner(0);
        setGameState((gameState) => ({
          ...gameState,
          totalGames: gameState.totalGames + 1,
        }));

        setLogs((logs) => [...logs, "Game over, failed on prisoner " + manIdx]);
        break;
      }

      if (manIdx === newBoxes.length) {
        setGameRunning(false);

        if (floatingPrisoner) {
          floatingPrisoner.style.opacity = "0";
          floatingPrisoner.style.left = `${defaultPosFloatingPrisoner}px`;
        }

        setCurrentPrisoner(0);
        setGameState((gameState) => ({
          ...gameState,
          totalGames: gameState.totalGames + 1,
          passedGames: gameState.passedGames + 1,
        }));
        setLogs((logs) => [...logs, "All prisoners found their number"]);
        break;
      }
    }
  };

  const resetGame = async () => {
    setGameState({
      totalGames: 0,
      passedGames: 0,
    });
    setCurrentPrisoner(0);
    setGameRunning(false);
    setCurrentIteration(0);
  };

  const startIterations = async () => {
    for (let i = 0; i < cfg.noOfIterations; i++) {
      setCurrentIteration(i);
      const newBoxes = createRandomArray(cfg.noOfMen);
      setBoxes(newBoxes);
      await startTheGame(newBoxes);
    }
  };

  return (
    <div className="prisoner-riddle">
      <div className="prisoner-riddle__play animation-slide-down">
        <h1>The 100 Prisoners Riddle / N wise men problem</h1>

        <div className="prisoner-riddle__play__boxes">
          <div className="prisoner-riddle__play__boxes__grid">
            {boxes.map((box, index) => (
              <Box key={`${box}-${index}`} number={box} index={index} />
            ))}
            <div
              className={`prisoner-riddle__play__boxes__grid__prisoner ${
                gameRunning
                  ? "prisoner-riddle__play__boxes__grid__prisoner--active"
                  : ""
              }`}
              ref={floatingPrisonerRef}
            >
              {currentPrisoner + 1}
            </div>
          </div>
        </div>
      </div>
      <Settings
        submitConfig={handleConfigChange}
        gameState={gameState}
        currentPrisoner={currentPrisoner}
        currentIteration={currentIteration}
        startGame={startIterations}
        resetGame={resetGame}
        gameRunning={gameRunning}
      />
      <Footer />
      <Console logs={logs} />
    </div>
  );
};
