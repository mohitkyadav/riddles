import { randomNumFromInterval } from "../../utils";
import "./FloatingPaperSheets.scss";

interface FloatingPaperSheetsProps {
  noOfSheets?: number;
  maxSheetHeight?: number;
  minSheetHeight?: number;
}

export const FloatingPaperSheets: React.FC<FloatingPaperSheetsProps> = ({
  noOfSheets = 10,
  minSheetHeight = 75,
  maxSheetHeight = 78,
}) => {
  return (
    <div className="floating-paper-sheets">
      {Array.from({ length: noOfSheets }).map((_, index) => (
        <div
          className="floating-paper-sheets__sheet"
          key={index}
          style={{
            animationDuration: `${randomNumFromInterval(2, 4)}s`,
            height: `${randomNumFromInterval(minSheetHeight, maxSheetHeight)}%`,
          }}
        />
      ))}
    </div>
  );
};
