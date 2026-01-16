import React, { useContext } from "react";
import { UserContext } from "./UseProvider";

function Questions() {
  const { 
    questions, 
    index, 
    dispatch, 
    answers, 
    points, 
    timer 
  } = useContext(UserContext);

  const currentQuestion = questions[index];
  const answer = answers[index] ?? null;
  const hasAnswered = answer !== null;

  const maxPossiblePoint = questions.reduce(
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
          Question {index + 1}/{questions.length}
        </span>
      </h3>
      <div className="progress">
        <progress
          value={index + Number(answer !== null)}
          max={questions.length}
        ></progress>
      </div>
      <h2>
        {currentQuestion.question}
        <p className="point-text">({currentQuestion.points} for this question)</p>
      </h2>
      <div className="options">
        {currentQuestion.options.map((option, i) => (
          <button
            disabled={hasAnswered}
            onClick={() => dispatch({ type: "test", payload: i })}
            key={i}
            className={`btn btn-option ${i === answer ? "answer" : ""}
            ${
              hasAnswered
                ? currentQuestion.correctOption === i
                  ? "correct"
                  : "wrong"
                : ""
            } `}
          >
            {option}
          </button>
        ))}
        <div className="timer-div">
          Time remaining:
          <span className="time-remain">
            {mins < 10 ? "0" : ""}{mins}:{seconds < 10 ? "0" : ""}{seconds}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Questions;