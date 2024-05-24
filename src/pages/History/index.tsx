import React, { useEffect, useState } from 'react';

const History: React.FC = () => {
  const [history, setHistory] = useState<{ expression: string; result: number }[]>([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('calculatorHistory') || '[]');

    const result = [storedHistory[0]]
    for (let i = 1; i < storedHistory.length; i++) {
      if (storedHistory[i].expression !== storedHistory[i - 1].expression) {
        result.push(storedHistory[i]);
      }
    }

    setHistory(result)
  }, []);

  return (
    <div>
      <h1>History</h1>
      {history.length === 0 ? (
        <p>No history available</p>
      ) : (
        <ul>
          {history.map((entry, index) => (
            <li key={index}>
              {entry.expression} = {entry.result}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
