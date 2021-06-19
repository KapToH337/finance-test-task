import React, { useState } from 'react';

export const TickerBlock = ({ finance, findDifference }) => {
  const [off, setOff] = useState([]);

  return (
    <>
      {finance.map(finance => (
        <div className="block" key={finance.ticker}>
          {!off.includes(finance.ticker) ? (
            <div className="finance">
              <div className="title">
                <p className="finance__block">{finance.ticker}</p>
              </div>

              <div className="content">
                <p className="finance__block">{finance.price}</p>

                <p
                  className={
                    `finance__block
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
                    `finance__block
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
            <div className="finance">
              <div className="title">
                <p className="finance__block">{finance.ticker}</p>
              </div>

              <div className="content">
                <p className="finance__block-2">Ticker off</p>
              </div>
            </div>
          )}

            <div className="button">
              <button
                className="button__click"
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

        </div>
      ))}
    </>
  )
}
