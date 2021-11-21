import {
  IonCard,
  IonContent,
  IonImg,
  IonList,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import Logo from "../assets/QuizLogo.png";
import "./global.css";
import "./Game.css";
import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";

import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { GamesApi } from "../communication";
import { PostAnswerRequest } from "../communication/models";
import LoadingPage from "../components/LoadingPage";
import he from "he";

export interface GameProps {
  isPlayer1: boolean;
  gameId: string;
}

interface ReadyForNextQuestionMessage {
  id: string;
  isReady: boolean;
}

interface QuestionMessage {
  questionId: string;
  gameId: string;
  question: string;
  category: string;
  answers: AnswerDto[];
}

interface AnswerDto {
  answer: string;
  isCorrect: boolean;
}
const Game: React.FC = () => {
  const [counter, setCounter] = useState<number>(30);
  const [connection, setConnection] = useState<HubConnection>(null);
  const [answer, setAnswer] = useState<string>(null);
  const [question, setQuestion] = useState<QuestionMessage>(null);
  const [hasPlayer2Answered, setHasPlayer2Answered] = useState<boolean>(false);
  const location = useLocation();
  const gameApi = new GamesApi();

  useEffect(() => {
    setAnswer(null);
    setCounter(30);
  }, [question]);

  useEffect(() => {
    if (!question) {
      gameApi
        .gamesIdQuestionGet((location.state as GameProps).gameId)
        .then((response) => {});
    }
  }, []);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:5001/hubs/game")
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection.start().then((result) => {
        console.log("Connected to web sockets");
        connection.on("answered", (message: ReadyForNextQuestionMessage) => {
          console.log(message);
          setHasPlayer2Answered(message.isReady);
        });
        connection.on("question", (message: QuestionMessage) => {
          setQuestion(message);
          setHasPlayer2Answered(false);
        });
      });
    }
  }, [connection]);

  useEffect(() => {
    if (answer) {
      const postAnswerRequest: PostAnswerRequest = {
        isCorrect:
          question.answers.filter((answer) => answer.isCorrect)[0].answer ===
          answer,
      };
      gameApi
        .gamesIdQuestionQuestionIdPost(
          (location.state as GameProps).gameId,
          question.questionId,
          postAnswerRequest
        )
        .then(() => {});
    }
  }, [answer]);

  useEffect(() => {
    console.log(
      `${answer} ${
        (location.state as GameProps).isPlayer1
      } ${hasPlayer2Answered}`
    );

    if (
      (!(location.state as GameProps).isPlayer1 && answer) ||
      ((location.state as GameProps).isPlayer1 && answer && hasPlayer2Answered)
    ) {
      gameApi
        .gamesIdQuestionGet((location.state as GameProps).gameId)
        .then((response) => {});
    }
  }, [answer, hasPlayer2Answered]);

  const onAnswer = (clickedAnswer: string) => {
    if (!answer) {
      setAnswer(clickedAnswer);
    }
  };

  return (
    <IonPage>
      {!question || !location.state ? (
        <LoadingPage />
      ) : (
        <IonPage>
          <IonToolbar color="background">
            <div className="flex toolbar-container">
              <IonImg className="small-logo" src={Logo} />
            </div>
          </IonToolbar>
          <IonContent className="game-container">
            <div className="question-card-container">
              {" "}
              <p className="secondary">1/10</p>
              <IonCard className="question-card">
                <p className="dark">{he.decode(question.question)}</p>
              </IonCard>
              <small>Category:</small>
            </div>
            <IonList className="options-list">
              {question.answers.map((answer) => {
                return (
                  <IonCard
                    onClick={() => {
                      onAnswer(answer.answer);
                    }}
                    className="options-card"
                    key={answer.answer}
                  >
                    <p className="dark">{he.decode(answer.answer)}</p>
                  </IonCard>
                );
              })}
            </IonList>

            <div className="counter-container">
              <div className="counter">
                <p> {counter == 0 ? "time is up" : counter}</p>
              </div>
            </div>
          </IonContent>
        </IonPage>
      )}
    </IonPage>
  );
};

export default Game;
