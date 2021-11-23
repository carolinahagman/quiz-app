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
} from "@ionic/react";
import "./global.css";
import "./Result.css";
import confetti from "canvas-confetti";
import defaultAvatar from "../assets/avatar/Avatar.png";
import Logo from "../assets/QuizLogo.png";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import LoadingPage from "../components/LoadingPage";
import { GamesApi } from "../communication";

export interface ResultProps {
  gameId: string;
}

const Result: React.FC = () => {
  const [avatar, setAvatar] = useState<string>(defaultAvatar);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ifCorrect, setIfCorrect] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);
  const [winner, setWinner] = useState<boolean>(null);
  const history = useHistory();
  const gameApi = new GamesApi();

  useEffect(() => {}, []);

  useEffect(() => {
    if (winner) {
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
            <h3>{winner ? "You won!" : "You lost :("}</h3>
            <IonList className="result-list">
              <IonCard className="result-card flex">
                <div className="flex">
                  <IonAvatar className="small-avatar">
                    <IonImg className="avatar" src={defaultAvatar} />
                  </IonAvatar>
                  <p className="secondary">username</p>
                </div>
                <IonButton onClick={openResult} fill="clear" color="dark">
                  10/10
                </IonButton>
              </IonCard>
              <div
                className={
                  visible
                    ? "question-result-container visible"
                    : "question-result-container hidden"
                }
              >
                <div className={ifCorrect ? "success box" : "danger box"}>
                  1
                </div>
                <div className="box success">2</div>
                <div className="box success">3</div>
                <div className="box success">4</div>
                <div className="box success">5</div>
                <div className="box success">6</div>
                <div className="box success">7</div>
                <div className="box success">8</div>
                <div className="box success">9</div>
                <div className="box success">10</div>
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
