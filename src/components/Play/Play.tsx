import "./Play.scss";

interface PlayProps {
  boxes: Array<number>;
}

export const Play: React.FC<PlayProps> = ({ boxes }) => {
  return (
    <div className="play">
      <h1>Visualization</h1>

      <div className="play__boxes">
        {boxes.map((box, index) => (
          <div key={index} className="play__boxes__box">
            {box}
            <div className="play__boxes__box__cover">{index}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
