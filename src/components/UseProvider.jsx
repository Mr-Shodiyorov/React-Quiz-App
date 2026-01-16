import React, { createContext, useReducer, useEffect } from "react";
import { questionsData } from "../questions-data";

export const UserContext = createContext();

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answers: [],
  points: 0,
  timer: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "fetchQuestion":
      return { ...state, questions: action.payload, status: "start", timer: action.payload.length * 30 };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "test" };
    case "timer":
      return { ...state, timer: state.timer - 1 };
    case "test":
      const question = state.questions.at(state.index);
      const isFirstTime = state.answers[state.index] === undefined;
      const newPoints = isFirstTime && action.payload === question.correctOption
          ? state.points + question.points
          : state.points;
      const updatedAnswers = [...state.answers];
      updatedAnswers[state.index] = action.payload;
      return { ...state, answers: updatedAnswers, points: newPoints };
    case "nextQuestion":
      return { ...state, index: state.index + 1 };
    case "previousQuestion":
      return { ...state, index: state.index - 1 };
    case "finishQuestion":
      return { ...state, status: "finish" };
    case "restart":
      return { ...initialState, questions: state.questions, status: "start", timer: state.questions.length * 30 };
    default:
      return state;
  }
}

export default function UserProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (questionsData) dispatch({ type: "fetchQuestion", payload: questionsData });
    else dispatch({ type: "dataFailed" });
  }, []);

  useEffect(() => {
    if (state.status !== "test") return;
    if (state.timer <= 0) {
      dispatch({ type: "finishQuestion" });
      return;
    }
    const id = setInterval(() => dispatch({ type: "timer" }), 1000);
    return () => clearInterval(id);
  }, [state.status, state.timer]);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}