import React, { useContext } from "react";
import { UserContext } from "./UseProvider";

function FinishBtn() {
  const { dispatch, answers, index } = useContext(UserContext);

  if (answers[index] === undefined) return null;

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