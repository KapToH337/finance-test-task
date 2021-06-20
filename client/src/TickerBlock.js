import React, { useState } from 'react';

import {DeletedBlock} from './DeletedBlock'

export const TickerBlock = ({ finance, findDifference }) => {
  const [off, setOff] = useState([]);
  const [deleted, setDeleted] = useState(['']);

  const add = (del) => {
    const copy = deleted.slice();
    const index = copy.indexOf(del);
    copy.splice(index, 1);

    setDeleted(copy);
  }

  return (
    <>
      {finance.map(finance => (
        <div key={finance.ticker}>
          {!deleted.some(del => del === finance.ticker) && (
            <div className="finance">
              {!off.includes(finance.ticker) ? (
                <div className="finance__block">
                  <div className="finance__title">
                    <p className="finance__value">{finance.ticker}</p>
                  </div>

                  <div className="finance__content">
                    <p className="finance__price">{finance.price}</p>

                    <p
                      className={
                        `finance__value
                        ${findDifference(finance)
                          ? 'plus'
                          : 'minus'
                        }`
                      }
                    >
                      {findDifference(finance) ? '+' : '-'}{finance.change}$
                    </p>

                    <p
                      className={
                        `finance__value
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
                    </p>
                  </div>
                </div>
              ) : (
                <div className="finance__block">
                  <div className="finance__title">
                    <p className="finance__value">{finance.ticker}</p>
                  </div>

                  <div className="content">
                    <p className="finance__value-2">Ticker off</p>
                  </div>
                </div>
              )}
              <div className="finance__buttons">
                <div className="finance__button">
                  <button
                    className="finance__click"
                    type="button"
                    onClick={() => {
                      off.includes(finance.ticker)
                      ? setOff(off => (off.filter(off => off !== finance.ticker)))
                      : setOff(off => [...off, finance.ticker])
                    }}
                  >
                    {off.includes(finance.ticker) ? 'On' : 'Off'}
                  </button>
                </div>

                <div className="finance__button">
                  <button
                    className="finance__click"
                    type="button"
                    onClick={() => {
                      setDeleted([...deleted, finance.ticker])
                    }}
                  >
                    X
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      <DeletedBlock
        deleted={deleted}
        add={add}
      />
    </>
  )
}
