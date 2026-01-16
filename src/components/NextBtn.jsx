import React, { useContext } from "react";
import { UserContext } from "./UseProvider";

function NextBtn() {
  const { dispatch} = useContext(UserContext);



  return (
    <div>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    </div>
  );
}

export default NextBtn;