import React from "react";

function PreviousBtn({ dispatch, answer }) {
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
