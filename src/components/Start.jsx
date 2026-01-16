import React, { useContext } from "react";
import { UserContext } from "./UseProvider";

function Start() {
  const { dispatch, questions } = useContext(UserContext);

  return (
    <div className="start">
      <h1>Test your React knowledge with {questions.length} questions</h1>
      <h4>{(questions.length * 30) / 60} minutes and {questions.length} questions to challenge yourself</h4>
      <button 
        className="btn btn-ui" 
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start
      </button>
    </div>
  );
}

export default Start;