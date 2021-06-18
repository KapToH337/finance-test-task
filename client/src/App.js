import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";

import './App.css';

export const App = () => {
  const [finance, setFinance] = useState([]);
  const [prev, setPrev] = useState([]);
  const [off, setOff] = useState([]);

  const setNewPrice = (count, prev) => {
    const socket = io("http://localhost:4000");
    socket.emit('start');
    socket.on('ticker', function(response) {
      if (count === 0) {
        prevValue(prev);
        setFinance(response);
        prev = response;
      }

      count++;

      if (count === 1) {
        count = 0;
      }
    });
  };

  useEffect(() => {
    let count = 0;
    let prev = [];
    setNewPrice(count, prev);
  }, []);

  const prevValue = (value) => {
    setPrev(value);
  };

  const findDifference = (obj, percent) => {
    const value = prev.filter(prev => prev.ticker === obj.ticker);

    if (percent) {
      return value.some(prev => prev.change_percent < obj.change_percent)
    } else {
      return value.some(prev => prev.change < obj.change)
    }
  };

  return (
    <section className="App">
      <div className="list">
        {finance.map(finance => (
          <div className="block" key={finance.ticker}>
            {!off.includes(finance.ticker) && (
              <div className="block">
                <div className="finance">{finance.ticker}</div>
                <div className="finance">{finance.price}</div>
                <div
                  className={
                    `finance
                    ${findDifference(finance) ? 'plus' : 'minus'}`
                  }
                >
                  {findDifference(finance) ? '+' : '-'}{finance.change}$
                </div>
                <div
                  className={
                    `finance
                    ${findDifference(finance, 'percent') ? 'plus' : 'minus'}`}
                >
                  {findDifference(finance, 'percent')
                    ? (
                      <svg width="16" height="16" viewBox="0 0 24 24">
                        <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path>
                      </svg>
                    )
                    : (
                      <svg width="16" height="16" viewBox="0 0 24 24">
                        <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path>
                      </svg>
                    )
                  }
                  {finance.change_percent}%
                </div>
              </div>
            )}
            <button
              type="button"
              onClick={() => {
                off.includes(finance.ticker)
                ? setOff(off => (off.filter(off => off !== finance.ticker)))
                : setOff(off => [...off, finance.ticker])
              }}
            >
              {!off.includes(finance.ticker) ? 'On' : 'Off'}
            </button>
            </div>
        ))}
      </div>
    </section>
  );
}
