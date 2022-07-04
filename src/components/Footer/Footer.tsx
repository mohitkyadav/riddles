import { Link, useLocation } from "react-router-dom";
import { CircularDivider } from "../Divider/Divider";
import "./Footer.scss";

export const Footer: React.FC = () => {
  const location = useLocation();

  return (
    <div className="footer animation-slide-down">
      {location.pathname !== "/" && (
        <>
          <Link to="/">Home</Link>
          <CircularDivider />
        </>
      )}
      <a
        href="https://github.com/mohitkyadav/"
        target="_blank"
        rel="noreferrer"
      >
        Made by Prisoner Mohit
      </a>
      <CircularDivider />
      <a
        href="https://github.com/mohitkyadav/n-wise-men"
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </a>
    </div>
  );
};
