import React, { useEffect, useState } from "react";

const fill = (maze) => {
  const data = [];

  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[0].length; j++) {
      const currentBox = maze[i][j];
      data.push({
        color:
          currentBox === 3
            ? "bg-cyan-500"
            : currentBox === 2
            ? "bg-lime-600"
            : currentBox === 1
            ? "bg-blue-200"
            : "bg-rose-900",
      });
    }
  }

  return data;
};

const Maze = (props) => {
  const [data, setData] = useState(fill(props.maze));

  useEffect(() => {
    console.log("newData", props.maze);
    setData(fill(props.maze));
  }, [props]);

  return (
    <div className="container mx-auto py-7">
      <div
        className={`grid grid-cols-10 gap-5 bg-gray-500 p-5 justify-items-center`}
      >
        {data.map((box) => (
          <div className={`w-20 h-14 ${box.color}`}></div>
        ))}
      </div>
    </div>
  );
};

export default Maze;
