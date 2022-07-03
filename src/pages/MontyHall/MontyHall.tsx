import { useState } from "react";
import { Footer, Console } from "../../components";
import { sleep } from "../../utils";
import "./MontyHall.scss";

export const MontyHall: React.FC = () => {
  const [noOfDoors, setNoOfDoors] = useState(10);
  const [noOfSimulations, setNoOfSimulations] = useState(3);
  const [logs, setLogs] = useState<string[]>([]);
  const [winPercentage, setWinPercentage] = useState(0);
  const [doorWithCar, setDoorWithCar] = useState(-1);
  const [selectedDoor, setSelectedDoor] = useState(-1);
  const [revealGoats, setRevealGoats] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const startSimulation = async () => {
    const noOfWins = await simulate();

    log("No of wins: ", noOfWins);

    const winPercentage = (noOfWins / noOfSimulations) * 100;
    setWinPercentage(winPercentage);
  };

  const simulate = async () => {
    let noOfWins = 0;
    const doorWithCar = Math.floor(Math.random() * noOfDoors) + 1;
    setDoorWithCar(doorWithCar);

    for (let i = 0; i < noOfSimulations; i++) {
      await sleep(300);

      const selectedDoor = Math.floor(Math.random() * noOfDoors) + 1;
      setSelectedDoor(selectedDoor);
      //  trigger select
    }

    return noOfWins;
  };

  const log = (...message: any[]) =>
    setLogs((logs) => [...logs, message.join()]);

  const randomizeCar = () => {
    log("Randomizing car...");
    setDoorWithCar(Math.floor(Math.random() * noOfDoors) + 1);
    log("Play: 1. Select a door");
  };

  const handleSelect = async (door: number) => {
    if (revealGoats) {
      if (door === doorWithCar) {
        log("You win!");
      } else {
        log("You lose!");
      }
      setGameOver(true);
      await sleep(1000);
      setGameOver(false);
      setRevealGoats(false);
      setSelectedDoor(-1);
      setDoorWithCar(-1);
    } else {
      setSelectedDoor(door);
      await sleep(1000);
      log(
        `Host: 2. Openning ${noOfDoors - 2} doors out of remaining ${
          noOfDoors - 1
        }.`
      );
      await sleep(1000);
      setRevealGoats(true);
      log("Play: 3. Stick or Switch?");
      await sleep(1000);
    }
  };

  return (
    <div className="mh">
      <h1>The Monty Hall Problem</h1>

      <div className="mh__container">
        <div className="mh__container__doors">
          {Array.from({ length: noOfDoors }).map((_, index) => (
            <button
              className="mh__container__doors__door"
              key={index}
              onClick={() => handleSelect(index)}
              disabled={
                (revealGoats &&
                  selectedDoor !== index &&
                  doorWithCar !== index) ||
                doorWithCar === -1
              }
            >
              <div className="mh__container__doors__door__content">
                <div className="mh__container__doors__door__content__text">
                  Door {index + 1}
                </div>
                <div className="mh__container__doors__door__content__icons">
                  {gameOver && doorWithCar === index && "🚗"}
                  {selectedDoor === index && "🤞"}
                  {revealGoats &&
                    doorWithCar !== index &&
                    selectedDoor !== index &&
                    "🐑"}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mh__container__controls">
          <button onClick={randomizeCar}>Randmize car + Start</button>
          <button onClick={startSimulation}>Start Simulation</button>
        </div>
      </div>

      <Footer />
      <Console logs={logs} />
    </div>
  );
};
