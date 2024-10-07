import React, { useState } from 'react';
import './index.css';

export default function ShortPath() {
  const [matrix] = useState(
    Array.from({ length: 20 }, () => Array(20).fill(1))
  );
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [path, setPath] = useState([]);

  const handleTileClick = (row, col) => {
    if (!start) setStart([row, col]);
    else if (!end) setEnd([row, col]);
    else {
      setStart([row, col]);
    }
  };

  const findPath = async () => {
    console.log(start, end, 'testing');
    if (!start || !end) return alert('select both start and end');

    try {
      const response = await fetch(
        `http://localhost:3000/shortestPath?start=${JSON.stringify(
          start
        )}&end=${JSON.stringify(end)}`
      );
      const data = await response.json();
      console.log(data);
      setPath(data.path);
    } catch (error) {
      console.error('Erro fetching data', error);
    }
  };

  const renderTile = (row, col) => {
    let tileClass = 'tile';
    if (start && start[0] === row && start[1] === col) {
      tileClass += 'start';
    } else if (end && end[0] === row && end[1] === col) {
      tileClass += 'end';
    } else if (path.some((p) => p[0] === row && p[1] === col)) {
      tileClass += 'path';
    }

    return (
      <div
        key={`${row}-${col}`}
        className={tileClass}
        onClick={() => handleTileClick(row, col)}
      />
    );
  };

  return (
    <div>
      <div className="grid">
        {matrix.map((_, rowIndex) => (
          <div key={rowIndex} className="row">
            {matrix[rowIndex].map((_, colIndex) =>
              renderTile(rowIndex, colIndex)
            )}
          </div>
        ))}
      </div>
      <button onClick={findPath}>Submit</button>
    </div>
  );
}
