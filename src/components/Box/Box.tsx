interface BoxProps {
  number: number;
  index: number;
}

export const Box: React.FC<BoxProps> = ({ number, index }) => {
  return (
    <div
      id={`${index}-${number}`}
      className="main-page__play__boxes__grid__box"
    >
      {number}
      <div className="main-page__play__boxes__grid__box__cover">{index}</div>
    </div>
  );
};
