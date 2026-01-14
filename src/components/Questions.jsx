import React from "react";

function Questions({
  questions,
  dispatch,
  answer,
  points,
  index,
  allQuestion,
  timer,
}) {
  console.log(questions);
  const hasAnswered = answer != null;
  const maxPossiblePoint = allQuestion.reduce(
    (total, el) => total + el.points,
    0
  );

  const mins = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div>
      <h3 className="total btn ">
        <span>
          Total {points}/{maxPossiblePoint} points
        </span>{" "}
        <span>
          Question {index + 1}/{allQuestion.length}
        </span>
      </h3>
      <div className="progress">
        <progress
          value={index + Number(answer != null)}
          max={allQuestion.length}
        ></progress>
      </div>
      <h2>
        {questions.question}
        <p className="point-text">({questions.points} for this question)</p>
      </h2>
      <div className="options">
        {questions.options.map((option, index) => (
          <button
            disabled={hasAnswered}
            onClick={() => dispatch({ type: "test", payload: index })}
            key={index}
            className={`btn btn-option ${index == answer ? "answer" : ""}
            ${
              hasAnswered
                ? questions.correctOption == index
                  ? "correct"
                  : "wrong"
                : ""
            } `}
          >
            {option}
          </button>
        ))}
        <div className="timer-div">
          Time remaining:<span className="time-remain">{mins < 10 ? "0" : ""}{mins}:{seconds < 10 ? "0" : ""}{seconds}</span>
        </div>
      </div>
    </div>
  );
}

export default Questions;
