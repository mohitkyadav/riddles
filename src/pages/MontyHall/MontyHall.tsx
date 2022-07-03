import { useState } from "react";
import { Footer } from "../../components";
import "./MontyHall.scss";

export const MontyHall: React.FC = () => {
  const noOfDoors = 3;
  const noOfSimulations = 3;

  const [winPercentage, setWinPercentage] = useState(0);
  const [doorWithCar, setDoorWithCar] = useState(0);
  const [selectedDoor, setSelectedDoor] = useState(0);

  const startSimulation = async () => {
    const noOfWins = await simulate();

    console.log(
      "🚀 ~ file: MontyHall.tsx ~ line 19 ~ startSimulation ~ noOfWins",
      noOfWins
    );

    const winPercentage = (noOfWins / noOfSimulations) * 100;
    setWinPercentage(winPercentage);
  };

  const getOpenedDoors = (selectedDoor: number, doorWithCar: number) => {
    const openedDoors = [];
  };

  const simulate = async () => {
    let noOfWins = 0;
    const doorWithCar = Math.floor(Math.random() * noOfDoors) + 1;
    setDoorWithCar(doorWithCar);

    for (let i = 0; i < noOfSimulations; i++) {
      await new Promise((r) => setTimeout(r, 2000));

      const selectedDoor = Math.floor(Math.random() * noOfDoors) + 1;
      const openedDoors = getOpenedDoors(selectedDoor, doorWithCar);

      console.log(doorWithCar, selectedDoor, openedDoors);
    }

    return noOfWins;
  };

  return (
    <div className="mh">
      <h1>The Monty Hall Problem</h1>

      <div className="mh__container">
        <div className="mh__container__doors">
          {Array.from({ length: noOfDoors }).map((_, index) => (
            <div className="mh__container__doors__door" key={index}>
              <div className="mh__container__doors__door__content">
                <div className="mh__container__doors__door__content__text">
                  {index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mh__container__controls">
          <button onClick={startSimulation}>Start Simulation</button>
        </div>
      </div>

      <Footer />
    </div>
  );
};
