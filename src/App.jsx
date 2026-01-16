import React, { useContext } from "react";
import UserProvider, { UserContext } from "./components/UseProvider";
import UseProvider from "./components/UseProvider";
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

function AppContent() {
  const { status, questions, index } = useContext(UserContext);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loading />}
        {status === "error" && <Error />}
        {status === "finish" && <Finish />}
        {status === "start" && <Start />}
        {status === "test" && (
          <>
            <Questions />
            <div className="switch-questions">
              {index !== 0 ? <PreviousBtn /> : <p></p>}
              {index + 1 === questions.length ? <FinishBtn /> : <NextBtn />}
            </div>
          </>
        )}
      </Main>
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
