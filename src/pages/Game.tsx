import {
  IonCard,
  IonContent,
  IonImg,
  IonList,
  IonPage,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import Logo from "../assets/QuizLogo.png";
import "./global.css";
import "./Game.css";
import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";

import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { GamesApi } from "../communication";
import { PostAnswerRequest } from "../communication/models";
import LoadingPage from "../components/LoadingPage";
import he from "he";
import { ResultProps } from "./Result";

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
  questionNumber: number;
  question: string;
  category: string;
  answers: AnswerDto[];
}

interface InformDoneMessage {
  gameId: string;
}

interface AnswerDto {
  answer: string;
  isCorrect: boolean;
}
const Game: React.FC = () => {
  const [counter, setCounter] = useState<number>(15);
  const [connection, setConnection] = useState<HubConnection>(null);
  const [playerAnswer, setPlayerAnswer] = useState<string>(null);
  const [question, setQuestion] = useState<QuestionMessage>(null);
  const [highlighted, setHighlighted] = useState<boolean>(false);
  const [hasPlayer2Answered, setHasPlayer2Answered] = useState<boolean>(false);
  const location = useLocation();
  const history = useHistory();
  const gameApi = new GamesApi();
  const [present] = useIonToast();

  useEffect(() => {
    setPlayerAnswer(null);
    setCounter(15);
  }, [question]);

  useEffect(() => {
    if (!question) {
      gameApi
        .gamesIdQuestionGet((location.state as GameProps).gameId)
        .then((response) => {});
    }
  }, []);

  useEffect(() => {
    if (playerAnswer) {
      setCounter(15);
    } else {
      const interval =
        counter > 0 &&
        setInterval(() => {
          setCounter(counter - 1);
        }, 1000);
      return () => clearInterval(interval);
    }
  }, [counter, playerAnswer]);

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
          setHighlighted(false);
          setQuestion(message);
          setHasPlayer2Answered(false);
        });
        connection.on("done", (message: InformDoneMessage) => {
          console.log("game is done");

          console.log(message);
          const state: ResultProps = {
            gameId: message.gameId,
          };
          history.replace("/result", state);
        });
      });
    }
  }, [connection]);

  useEffect(() => {
    if (playerAnswer) {
      const postAnswerRequest: PostAnswerRequest = {
        isCorrect:
          question.answers.filter((answer) => answer.isCorrect)[0].answer ===
          playerAnswer,
      };
      gameApi
        .gamesIdQuestionQuestionIdPost(
          (location.state as GameProps).gameId,
          question.questionId,
          postAnswerRequest
        )
        .then(() => {});
    }
  }, [playerAnswer]);

  useEffect(() => {
    console.log(
      `${playerAnswer} ${
        (location.state as GameProps).isPlayer1
      } ${hasPlayer2Answered}`
    );

    if (
      (!(location.state as GameProps).isPlayer1 && playerAnswer) ||
      ((location.state as GameProps).isPlayer1 &&
        playerAnswer &&
        hasPlayer2Answered)
    ) {
      gameApi
        .gamesIdQuestionGet((location.state as GameProps).gameId)
        .then((response) => {});
    }
  }, [playerAnswer, hasPlayer2Answered]);

  const onAnswer = (clickedAnswer: string) => {
    if (!playerAnswer) {
      setPlayerAnswer(clickedAnswer);
      setHighlighted(true);
    }
  };

  const timeIsUp = () => {
    if (!playerAnswer) {
      present({
        buttons: [],
        message: "Sorry you're out of time",
        color: "danger",
        cssClass: "toast-danger",
        duration: 2000,
      });
      setPlayerAnswer("time is up");
      if (!(location.state as GameProps).isPlayer1) {
        setHasPlayer2Answered(true);
      }
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
              <p className="secondary">{question.questionNumber + 1}/10</p>
              {/* TODO: on click show red bg if not correct, green if correct */}
              <IonCard className="question-card">
                <p className="dark">{he.decode(question.question)}</p>
              </IonCard>
              <small>Category: {he.decode(question.category)}</small>
            </div>
            <IonList className="options-list">
              {question.answers.map((answer) => {
                return (
                  <IonCard
                    onClick={() => {
                      onAnswer(answer.answer);
                    }}
                    className={`options-card ${
                      highlighted &&
                      (answer.isCorrect || answer.answer === playerAnswer)
                        ? "highlighted"
                        : ""
                    } ${
                      highlighted && answer.isCorrect ? "success" : "danger"
                    }`}
                    key={answer.answer}
                  >
                    <p className="dark">{he.decode(answer.answer)}</p>
                  </IonCard>
                );
              })}
            </IonList>

            <div className="counter-container">
              <div className="counter">
                <p> {counter == 0 ? timeIsUp() : counter}</p>
              </div>
            </div>
          </IonContent>
        </IonPage>
      )}
    </IonPage>
  );
};

export default Game;
