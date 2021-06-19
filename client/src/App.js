import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";

import {TickerBlock} from './TickerBlock';

import './App.css';

export const App = () => {
  const [finance, setFinance] = useState([]);
  const [prev, setPrev] = useState([]);

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
    if (prev.length === 0) {
      return
    }

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
        <h1>You may be interested in</h1>
        <TickerBlock
          finance={finance}
          findDifference={findDifference}
        />
      </div>
    </section>
  );
}
