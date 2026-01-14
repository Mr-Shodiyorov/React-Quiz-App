import React from "react";

function FinishBtn({ dispatch, answer }) {
  return (
    <div>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finishQuestion" })}
      >
        Finish Quiz
      </button>
    </div>
  );
}

export default FinishBtn;
