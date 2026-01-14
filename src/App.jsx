import { useEffect, useReducer } from "react";
import axios from "axios";
import Header from "./components/Header";
import Main from "./components/Main";
import Loading from "./components/Loading";
import Start from "./components/Start";
import Questions from "./components/Questions";
import NextBtn from "./components/NextBtn";
import PreviousBtn from "./components/PreviousBtn";
import FinishBtn from "./components/FinishBtn";
import Finish from "./components/Finish";
import Error from "./components/Error";

import { questionsData } from "./questions-data";

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
      return {
        ...state,
        questions: action.payload,
        status: "start",
        timer: action.payload.length * 30,
      };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "test" };
    case "timer":
      return { ...state, timer: state.timer - 1 };
    case "test":
      const question = state.questions.at(state.index);

      const isFirstTime = state.answers[state.index] === undefined;
      const newPoints =
        isFirstTime && action.payload === question.correctOption
          ? state.points + question.points
          : state.points;

      const updatedAnswers = [...state.answers];
      updatedAnswers[state.index] = action.payload;

      return {
        ...state,
        answers: updatedAnswers,
        points: newPoints,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1 };
    case "previousQuestion":
      return { ...state, index: state.index - 1 };
    case "finishQuestion":
      return { ...state, status: "finish" };
    case "restart":
      return {
        ...state,
        status: "start",
        index: 0,
        answers: [],
        points: 0,
        timer: state.questions.length * 30,
      };
    default:
      return state;
  }
}

function App() {
  const [{ questions, status, index, points, answers, timer }, dispatch] =
    useReducer(reducer, initialState);

  useEffect(() => {
    if (questionsData) {
      dispatch({ type: "fetchQuestion", payload: questionsData });
    } else {
      dispatch({ type: "dataFailed" });
    }
  }, []);
  useEffect(() => {
    if (status != "test") return;

    if (timer <= 0) {
      dispatch({ type: "finishQuestion" });
      return;
    }

    const id = setInterval(() => {
      dispatch({ type: "timer" });
    }, 1000);

    return () => clearInterval(id);
  }, [status, timer, dispatch]);

  return (
    <div className="app">
      <Header />
      <Main>
        {status == "loading" ? <Loading /> : ""}
        {status == "error" ? <Error /> : ""}
        {status == "finish" ? (
          <Finish
            points={points}
            dispatch={dispatch}
            allQuestion={questions}
            timer={questions.length * 30 - timer}
          />
        ) : (
          ""
        )}
        {status == "start" ? (
          <Start dispatch={dispatch} questions={questions} />
        ) : (
          ""
        )}
        {status == "test" ? (
          <>
            <Questions
              timer={timer}
              allQuestion={questions}
              answer={answers[index] ?? null}
              questions={questions[index]}
              dispatch={dispatch}
              points={points}
              index={index}
            />
            <div className="switch-questions">
              {index != 0 ? (
                <PreviousBtn dispatch={dispatch} answer={answers} />
              ) : (
                <p></p>
              )}

              {index + 1 == questions.length ? (
                <FinishBtn dispatch={dispatch} answer={answers} />
              ) : (
                <NextBtn dispatch={dispatch} answer={answers} />
              )}
            </div>
          </>
        ) : (
          ""
        )}
      </Main>
    </div>
  );
}

export default App;
