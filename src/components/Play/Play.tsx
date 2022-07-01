import { useState } from "react";

import "./Play.scss";

interface PlayProps {
  boxes: Array<number>;
}

export const Play: React.FC<PlayProps> = ({ boxes }) => {
  const [passedMen, setPassedMen] = useState(0);

  const startTheGame = () => {
    let manIdx = 0;
    let boxIdx = manIdx;
    let boxCounter = 0;

    const interval = setInterval(() => {
      console.log(`Man ${manIdx} looking into box ${boxIdx}`);

      const boxValue = boxes[boxIdx];
      const box = document.getElementById(`${boxIdx}-${boxValue}`);
      // add data-active to the box
      box?.setAttribute("data-active", "true");

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

      setTimeout(() => box?.removeAttribute("data-active"), 300);

      if (boxCounter > boxes.length / 2 || manIdx === boxes.length) {
        clearInterval(interval);
      }
    }, 300);
  };

  const checkBox = (manIdx: number, boxValue: number) => {
    if (manIdx === boxValue) {
      setPassedMen(passedMen + 1);
    }
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
