import React, { useContext } from "react";
import { UserContext } from "./UseProvider";

function PreviousBtn() {
  const { dispatch } = useContext(UserContext);

  return (
    <div>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "previousQuestion" })}
      >
        Previous
      </button>
    </div>
  );
}

export default PreviousBtn;