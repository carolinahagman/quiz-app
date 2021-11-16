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

import Connection from "../components/Connection";
import { useState } from "react";

const Game: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <IonPage>
      {isLoading ? (
        <Connection username="username" />
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
                <p className="dark">This is the question</p>
              </IonCard>
              <small>Category:</small>
            </div>
            <IonList className="options-list">
              <IonCard className="options-card">
                <p className="dark">option 1</p>
              </IonCard>
              <IonCard className="options-card">
                <p className="dark">option 2</p>
              </IonCard>
              <IonCard className="options-card">
                <p className="dark">option 3</p>
              </IonCard>
              <IonCard className="options-card">
                <p className="dark">option 4</p>
              </IonCard>
            </IonList>

            <div>Time component</div>
          </IonContent>
        </IonPage>
      )}
    </IonPage>
  );
};

export default Game;
