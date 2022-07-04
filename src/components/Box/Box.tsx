interface BoxProps {
  number: number;
  index: number;
}

export const Box: React.FC<BoxProps> = ({ number, index }) => {
  return (
    <div
      id={`${index}-${number}`}
      className="prisoner-riddle__play__boxes__grid__box"
    >
      {number + 1}
      <div className="prisoner-riddle__play__boxes__grid__box__cover">
        Box {index + 1}
      </div>
    </div>
  );
};
