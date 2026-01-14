import React from "react";

function Start({ dispatch, questions }) {
  return (
    <div className="start">
      <h1>Test your React knowledge with {questions.length} questions</h1>
      <h4>15 minutes and 15 questions to challenge yourself</h4>
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