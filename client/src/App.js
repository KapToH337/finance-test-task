import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";

import './App.css';

export const App = () => {
  const [finance, setFinance] = useState([]);
  const [pause, setPause] = useState(false);

  const setNewFinance = () => {
    const socket = io("http://localhost:4000");
    socket.emit('start');
    socket.on('ticker', function(response) {
      setFinance(response)
    });
  };

  useEffect(() => {
    setNewFinance();
  }, []);

  return (
    <section className="App">
      <div className="list">
        {finance.map(finance => (
          <div className="block" key={finance.ticker}>
            <div className="finance">{finance.ticker}</div>
            <div className="finance">{finance.price}</div>
            <div className="finance">{finance.change}</div>
            <div className="finance">{finance.change_percent}%</div>
          </div>
        ))}
      </div>

      <button onClick={() => {
        setPause(!pause);
      }}>
        {pause ? "Start" : "Pause"}
      </button>
    </section>
  );
}
