import { Play, ProblemConfig } from "../../components";
import "./MainPage.scss";

export const MainPage: React.FC = () => {
  return (
    <div className="main-page">
      <ProblemConfig />
      <Play />
    </div>
  );
};
