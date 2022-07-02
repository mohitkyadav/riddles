import { useEffect, useRef } from "react";
import "./Console.scss";

interface ConsoleProps {
  logs: string[];
  autoScroll?: boolean;
}

export const Console: React.FC<ConsoleProps> = ({
  logs,
  autoScroll = true,
}) => {
  const consoleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScroll) {
      consoleEndRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [logs]);

  return (
    <div className="console">
      {logs.map((log, idx) => (
        <div className="console__log" key={idx + log}>
          {log}
        </div>
      ))}
      <div ref={consoleEndRef} />
    </div>
  );
};
