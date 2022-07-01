import { useState } from "react";

import "./Play.scss";

interface PlayProps {
  boxes: Array<number>;
  intervalDur: number;
}

export const Play: React.FC<PlayProps> = ({ boxes, intervalDur }) => {
  const [passedMen, setPassedMen] = useState(0);

  console.log("intervalDur", intervalDur);
  const startTheGame = () => {
    let manIdx = 0;
    let boxIdx = manIdx;
    let boxCounter = 0;

    const interval = setInterval(() => {
      console.log(`Man ${manIdx} looking into box ${boxIdx}`);

      const boxValue = boxes[boxIdx];
      const box = document.getElementById(`${boxIdx}-${boxValue}`);
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
      <h1>Visualization</h1>

      <div className="play__stats">
        <div className="play__stats__men">
          <h2>Total Men</h2>
          <span>{boxes.length}</span>
        </div>
        <div className="play__stats__men">
          <h2>Passed Men</h2>
          <span>{passedMen}</span>
        </div>
        <button onClick={startTheGame}>Start the game</button>
      </div>

      <div className="play__boxes">
        <h2>Boxes</h2>
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
