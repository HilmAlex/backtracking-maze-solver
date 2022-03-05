const dfs = (row, col, maze, path) => {
  const rowLength = maze.length;
  const colLength = maze[0].length;

  const rowConstraint = row >= rowLength || row < 0;
  const colConstraint = col >= colLength || col < 0;

  if (rowConstraint || colConstraint || maze[row][col] === 0) {
    return null;
  }

  path.push([row, col]);

  if (maze[row][col] === 2) {
    return path;
  }

  maze[row][col] = 0;

  const right = dfs(row, col + 1, maze, path);
  const left = dfs(row, col - 1, maze, path);
  const down = dfs(row + 1, col, maze, path);
  const up = dfs(row - 1, col, maze, path);

  return left || right || up || down;
};

export const solver = (rowStart, colStart, maze) => dfs(rowStart, colStart, maze, [], []);
