import Maze from "./components/Maze";
import { solver } from "../MazeSolver";
import { useState, useEffect } from "react";

function App() {
  const template = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  ];

  const initRow = 0;
  const initCol = 0;

  const [data, setData] = useState({
    prevRow: initRow,
    prevCol: initCol,
    prevValue: template[initRow][initCol],
    maze: template,
  });

  const [path, setPath] = useState(
    solver(initRow, initCol, JSON.parse(JSON.stringify(template)))
  );

  const [end, setEnd] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();

    if (path.length > 0) {
      const position = path.shift();
      const newRow = position[0];
      const newCol = position[1];

      if (data.maze[newRow][newCol] === 2) {
        setEnd(true);
      }

      setData((prevData) => {
        const { prevRow, prevCol, prevValue, maze } = prevData;
        const newMaze = JSON.parse(JSON.stringify(template));
        const newValue = maze[newRow][newCol];

        newMaze[prevRow][prevCol] = prevValue;

        newMaze[newRow][newCol] = 3;

        return {
          prevRow: newRow,
          prevCol: newCol,
          prevValue: newValue,
          maze: newMaze,
        };
      });
    }
  };

  return (
    <div className="App w-screen h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="container mx-auto flex flex-col">
        <Maze maze={data.maze} />
        {end && (
          <button className="mx-auto w-40 bg-rose-700 hover:bg-rose-900 text-white font-bold py-2 px-4 rounded">
            Llegaste
          </button>
        )}
        {!end && (
          <button
            onClick={handleClick}
            className="mx-auto w-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Next Step
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
