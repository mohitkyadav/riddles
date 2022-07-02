import { useState } from "react";
import { CurrentGameState } from "../../types";

import "./Play.scss";

interface PlayProps {
  boxes: Array<number>;
  intervalDur: number;
  setCurrentGameState: (state: CurrentGameState) => void;
}

export const Play: React.FC<PlayProps> = ({
  boxes,
  intervalDur,
  setCurrentGameState,
}) => {
  const [passedMen, setPassedMen] = useState(0);

  console.log("intervalDur", intervalDur);
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
      if (intervalDur >= 100) {
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
      if (intervalDur >= 100) {
        setTimeout(() => box?.removeAttribute("data-active"), intervalDur);
      }

      if (boxCounter > boxes.length / 2 || manIdx === boxes.length) {
        clearInterval(interval);
      }
    }, intervalDur);
  };

  return (
    <div className={`play ${boxes.length > 0 ? "play--active" : ""}`}>
      <h1>The 100 Prisoners Riddle / N wise men problem</h1>

      <div className="play__stats">
        <button onClick={startTheGame}>Start the game</button>
      </div>

      <div className="play__boxes">
        <div className="play__boxes__grid">
          {boxes.map((box, index) => (
            <div
              key={index}
              id={`${index}-${box}`}
              className="play__boxes__grid__box"
            >
              {box}
              <div className="play__boxes__grid__box__cover">{index}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
