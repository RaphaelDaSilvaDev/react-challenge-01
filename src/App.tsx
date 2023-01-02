import { useState } from "react";
import "./App.css";

interface DotsProps {
  clientX: number;
  clientY: number;
}

function App() {
  const [dots, setDots] = useState<DotsProps[]>([]);
  const [removedDots, setRemoveDots] = useState<DotsProps[]>([]);

  // This function get every click on screen
  function handleOnClick(event: React.MouseEvent<HTMLInputElement>) {
    // Get the point of screen has clicked
    const { clientX, clientY } = event;

    // Create a new dont using the points has clicked
    const newDot = {
      clientX,
      clientY,
    };

    // Save a new point
    setDots((prev) => [...prev, newDot]);
    setRemoveDots([]);
  }

  // This function dispar ever undo button click
  function handleOnUndo(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();

    if (dots.length === 0) {
      return;
    }

    // Get last dot has saved
    const lastDot = dots[dots.length - 1];

    // Save the last dot removed in new list
    setRemoveDots((prev) => [...prev, lastDot]);

    // Remove the last dot has saved
    setDots((prev) => prev.slice(0, -1));
  }

  function handleOnRedo(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();

    if (removedDots.length === 0) {
      return;
    }

    // Get las dot has saved to recovery
    const recoveredDot = removedDots[removedDots.length - 1];

    // Save the last dot to revovery to show
    setDots((prev) => [...prev, recoveredDot]);

    // Remove the last dot has recovered
    setRemoveDots((prev) => prev.slice(0, -1));
  }

  return (
    <div id="page" onClick={handleOnClick}>
      <button onClick={handleOnUndo} className="button" disabled={dots.length === 0}>
        Desfazer
      </button>
      <button onClick={handleOnRedo} className="button" disabled={removedDots.length === 0}>
        Refazer
      </button>
      {dots.map((dot) => (
        <span
          className="dot"
          key={dot.clientX + dot.clientY}
          style={{ top: dot.clientY, left: dot.clientX }}
        />
      ))}
    </div>
  );
}

export default App;
