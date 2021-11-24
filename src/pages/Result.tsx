import {
  IonAvatar,
  IonButton,
  IonCard,
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonList,
  IonPage,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import "./global.css";
import "./Result.css";
import confetti from "canvas-confetti";
import defaultAvatar from "../assets/avatar/Avatar.png";
import Logo from "../assets/QuizLogo.png";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import LoadingPage from "../components/LoadingPage";
import { GamesApi } from "../communication";
import { GetGameResponse } from "../communication/models";
import { userInfo } from "os";

export interface ResultProps {
  gameId: string;
}

export interface Score {
  user1Score: number;
  user2Score: number;
}

const Result: React.FC = () => {
  const [avatar, setAvatar] = useState<string>(defaultAvatar);
  const [gameResult, setGameResult] = useState<GetGameResponse>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);
  const [winner, setWinner] = useState<string>(null);
  const [score, setScore] = useState<Score>(null);
  const [present] = useIonToast();
  const history = useHistory();
  const location = useLocation();
  const gameApi = new GamesApi();

  useEffect(() => {
    if (gameResult) {
      setIsLoading(false);
      getWinner();
    }
  }, [gameResult]);

  useEffect(() => {
    gameApi
      .gamesIdGet((location.state as ResultProps).gameId)
      .then((response) => {
        console.log(response.data);
        setGameResult(response.data);
      })
      .catch(() => {
        present({
          buttons: [],
          message: "Couldn't find the game result",
          color: "danger",
          cssClass: "toast-danger",
          duration: 2000,
        });
        history.push("/home");
      });
  }, []);

  useEffect(() => {
    if (winner && !isLoading) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, []);

  function playAgain() {
    console.log("play again");
  }

  function openResult() {
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }

  const getWinner = (): void => {
    let user1Score: number = 0;
    let user2Score: number = 0;

    gameResult.user1Result.forEach((answer) => {
      if (answer.correctAnswer) user1Score++;
    });
    gameResult.user2Result.forEach((answer) => {
      if (answer.correctAnswer) user2Score++;
    });

    console.log(`WINNER ${user1Score} ${user2Score}`);

    if (user1Score === user2Score) {
      setWinner(null);
    }
    if (user1Score > user2Score) {
      setWinner(gameResult.user1.username);
    }

    if (user2Score > user1Score) {
      setWinner(gameResult.user2.username);
    }
    setScore({
      user1Score,
      user2Score,
    });
  };

  return (
    <IonPage>
      {isLoading ? (
        <IonContent fullscreen>
          <LoadingPage />
        </IonContent>
      ) : (
        <IonContent fullscreen>
          <IonHeader className="ion-no-border">
            <IonToolbar color="background">
              <div className="flex toolbar-container">
                <IonImg className="small-logo" src={Logo} />
              </div>
            </IonToolbar>
          </IonHeader>

          <div className="result-container">
            <IonAvatar className="big-avatar">
              <IonImg className="avatar" src={avatar} />
            </IonAvatar>
            <h3>{winner ? `${winner} won this match!` : "Tied!"}</h3>
            <IonList className="result-list">
              <IonCard className="result-card flex">
                <div className="flex">
                  <IonAvatar className="small-avatar">
                    <IonImg className="avatar" src={avatar} />
                  </IonAvatar>
                  <p className="secondary">{gameResult.user1.username}</p>
                </div>
                <IonButton onClick={openResult} fill="clear" color="dark">
                  {score.user1Score}/10
                </IonButton>
              </IonCard>
              <div
                className={
                  visible
                    ? "question-result-container visible"
                    : "question-result-container hidden"
                }
              >
                {gameResult.user1Result.map((user1answer) => (
                  <div
                    key={user1answer.questionNumber}
                    className={
                      user1answer.correctAnswer ? "success box" : "danger box"
                    }
                  >
                    {user1answer.questionNumber + 1}
                  </div>
                ))}
              </div>

              <IonCard className="result-card flex">
                <div className="flex">
                  <IonAvatar className="small-avatar">
                    <IonImg className="avatar" src={avatar} />
                  </IonAvatar>
                  <p className="secondary">{gameResult.user2.username}</p>
                </div>
                <IonButton onClick={openResult} fill="clear" color="dark">
                  {score.user2Score}/10
                </IonButton>
              </IonCard>
              <div
                className={
                  visible
                    ? "question-result-container visible"
                    : "question-result-container hidden"
                }
              >
                {gameResult.user2Result.map((user2answer) => (
                  <div
                    key={user2answer.questionNumber}
                    className={
                      user2answer.correctAnswer ? "success box" : "danger box"
                    }
                  >
                    {user2answer.questionNumber + 1}
                  </div>
                ))}
              </div>
            </IonList>

            <div className="button-container">
              {/* <IonButton className="primary-button" onClick={playAgain}>
                Play Again
              </IonButton> */}

              <IonButton
                onClick={() => {
                  history.replace("/home");
                }}
                className="primary-button"
              >
                Home
              </IonButton>
            </div>
          </div>
        </IonContent>
      )}
    </IonPage>
  );
};

export default Result;
