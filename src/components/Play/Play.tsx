import { useState } from "react";

import "./Play.scss";

interface PlayProps {
  boxes: Array<number>;
}

export const Play: React.FC<PlayProps> = ({ boxes }) => {
  const [currentMan, setCurrentMan] = useState(0);
  const [passedMen, setPassedMen] = useState(0);

  const startTheGame = () => {
    setCurrentMan(0);
    setPassedMen(0);
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
        <button>Start the game</button>
      </div>

      <div className="play__boxes">
        <h2>Boxes</h2>
        <div className="play__boxes__grid">
          {boxes.map((box, index) => (
            <div key={index} className="play__boxes__grid__box">
              {box}
              <div className="play__boxes__grid__box__cover">{index}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
