import React from 'react';

export const DeletedBlock = ({ deleted, add }) => {
  return (
    <div className="deleted">
      {deleted[1] && <h2>Deleted Tickers</h2>}

      {deleted.map(del => (
        <div className="deleted__content" key={del}>
          {del !== '' && (
            <div className="deleted__block">
              <div>
                <p>{del}</p>
              </div>

              <div>
                <button
                  className="deleted__click"
                  type="button"
                  onClick={() => {
                    add(del)
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
