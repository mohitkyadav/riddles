import { useState } from "react";
import { Footer, Console, VerticalDivider } from "../../components";
import { getRandomIntApartFrom, sleep } from "../../utils";
import "./MontyHall.scss";

export const MontyHall: React.FC = () => {
  const [noOfDoors, setNoOfDoors] = useState(10);
  const [noOfSimulations, setNoOfSimulations] = useState(10000);
  const [logs, setLogs] = useState<string[]>([]);
  const [wins, setWins] = useState(0);
  const [doorWithCar, setDoorWithCar] = useState(-1);
  const [selectedDoor, setSelectedDoor] = useState(-1);
  const [revealGoats, setRevealGoats] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  // if selected door is correct, then hide another random door
  const [fakeDoorWithCar, setFakeDoorWithCar] = useState(-1);

  const startSimulation = async () => {
    const noOfWins = await simulate();

    log("No of wins:", noOfWins, "out of", noOfSimulations);

    setWins(noOfWins);
  };

  const simulate = async () => {
    let noOfWins = 0;
    randomizeCar();

    for (let i = 0; i < noOfSimulations; i++) {
      const selectedDoor = Math.floor(Math.random() * noOfDoors) + 1;

      // always follow switch strategy
      if (selectedDoor !== doorWithCar) {
        // We wil as we initially selected the wrong door
        noOfWins++;
      } else {
        // We lose as we initially selected the right door
      }
    }

    return noOfWins;
  };

  const log = (...message: any[]) =>
    setLogs((logs) => [...logs, message.join(" ")]);

  const randomizeCar = () => {
    setDoorWithCar(Math.floor(Math.random() * noOfDoors) + 1);
    log("Randomizing car...");
    log("Play: 1. Select a door");
  };

  const handleSelect = async (door: number) => {
    if (revealGoats) {
      if (door === doorWithCar) {
        log("You win!");
      } else {
        log("You lose!");
        setFakeDoorWithCar(-1);
      }
      setGameOver(true);
      await sleep(500);
      setGameOver(false);
      setRevealGoats(false);
      setSelectedDoor(-1);
      setDoorWithCar(-1);
      setFakeDoorWithCar(-1);
    } else {
      setSelectedDoor(door);

      if (door === doorWithCar) {
        setFakeDoorWithCar(getRandomIntApartFrom(door, noOfDoors));
      }

      await sleep(500);
      log(
        `Host: 2. Openning ${noOfDoors - 2} doors out of remaining ${
          noOfDoors - 1
        }.`
      );
      await sleep(500);
      setRevealGoats(true);
      log("Play: 3. Stick or Switch?");
      await sleep(500);
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
                  doorWithCar !== index &&
                  fakeDoorWithCar !== index) ||
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
                    fakeDoorWithCar !== index &&
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

        <div className="mh__container__settings">
          <div className="mh__container__settings__item">
            <label htmlFor="noOfDoors">No. of doors</label>
            <input
              type="number"
              id="noOfDoors"
              value={noOfDoors}
              onChange={(e) => setNoOfDoors(parseInt(e.target.value, 10))}
              min={3}
            />
          </div>

          <VerticalDivider />

          <div className="mh__container__settings__item">
            <label htmlFor="noOfDoors">No. of simulations</label>
            <input
              type="number"
              id="noOfSimulations"
              value={noOfSimulations}
              onChange={(e) => {
                setNoOfSimulations(parseInt(e.target.value, 10));
                setWins(0);
              }}
            />
          </div>

          <VerticalDivider />
          <div className="mh__container__settings__item">
            <span>Wins</span>
            <p>{wins}</p>
          </div>

          <div className="mh__container__settings__item">
            <span>Observed Probability (Always Switch)</span>
            <p>{wins / noOfSimulations}</p>
          </div>
        </div>
      </div>

      <Footer />
      <Console logs={logs} />
    </div>
  );
};
