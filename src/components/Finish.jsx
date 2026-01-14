import React from "react";

function Finish({ points, dispatch, allQuestion, timer }) {
  const maxPossiblePoint = allQuestion.reduce(
    (total, el) => total + el.points,
    0
  );
  
  const mins = Math.floor(timer / 60);
  const seconds = timer % 60;

  const percentage = Math.round((points / maxPossiblePoint) * 100);

  return (
    <div>
      <div className="start">
        <h2 className="finish-point">
          <span>
            {points >= 200
              ? "🔥"
              : points >= 100
              ? "😀"
              : points >= 50
              ? "🥲"
              : "🤣"}
          </span>
          <span>
            Final Score: ({points} / {maxPossiblePoint} points)
          </span>
        </h2>
        
        <h2 className="finish-point">
          <span>That is {percentage}%</span>
          <span className="font-small">
            You completed the quiz in {mins < 10 ? "0" : ""}{mins}:
            {seconds < 10 ? "0" : ""}{seconds}
          </span>
        </h2>
        
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "restart" })}
        >
          Restart Quiz
        </button>
      </div>
    </div>
  );
}

export default Finish;