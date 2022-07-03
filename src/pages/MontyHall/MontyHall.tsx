import { useState } from "react";
import { Footer, Console } from "../../components";
import { sleep } from "../../utils";
import "./MontyHall.scss";

export const MontyHall: React.FC = () => {
  const noOfDoors = 10;
  const noOfSimulations = 3;

  const [logs, setLogs] = useState<string[]>([]);
  const [winPercentage, setWinPercentage] = useState(0);
  const [doorWithCar, setDoorWithCar] = useState(-1);
  const [selectedDoor, setSelectedDoor] = useState(-1);

  const startSimulation = async () => {
    const noOfWins = await simulate();

    log("No of wins: ", noOfWins);

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
      await sleep(300);

      const selectedDoor = Math.floor(Math.random() * noOfDoors) + 1;
      setSelectedDoor(selectedDoor);

      const openedDoors = getOpenedDoors(selectedDoor, doorWithCar);
      log(
        "Iter: ",
        i,
        "doorWithCar: ",
        doorWithCar,
        "selectedDoor: ",
        selectedDoor,
        "openedDoors ",
        openedDoors
      );
    }

    return noOfWins;
  };

  const log = (...message: any[]) => {
    console.log(...message);
    setLogs([...logs, message.join()]);
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

                  {doorWithCar === index && (
                    <div className="mh__container__doors__door__content__text__car">
                      🚗
                    </div>
                  )}

                  {selectedDoor === index && (
                    <div className="mh__container__doors__door__content__text__selected">
                      🤞
                    </div>
                  )}
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
      <Console logs={logs} />
    </div>
  );
};
