import {
  IonButton,
  IonContent,
  IonImg,
  IonPage,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { GamesApi } from "../communication";
import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";

import { GameProps } from "./Game";
import Logo from "../assets/QuizLogo.png";

import "./global.css";
import "./ReadyCheck.css";
export interface ReadyCheckProps {
  gameId: string;
  isPlayer1: boolean;
}

interface ReadyStatusesMessage {
  id: string;
  user1Ready: boolean;
  user2Ready: boolean;
}

const ReadyCheck: React.FC = () => {
  const gameApi = new GamesApi();
  const [present, dismiss] = useIonToast();
  const [isReady, setIsReady] = useState<boolean>(false);
  const [otherPlayerReady, setOtherPlayerReady] = useState<boolean>(false);
  const [connection, setConnection] = useState<HubConnection>(null);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (isReady) {
      history.replace("/game", getGameProps());
    }
  }, [otherPlayerReady]);

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
        connection.on("readyGame", (message: ReadyStatusesMessage) => {
          if (
            (location.state as ReadyCheckProps).isPlayer1 &&
            message.user2Ready
          ) {
            setOtherPlayerReady(true);
          } else if (
            !(location.state as ReadyCheckProps).isPlayer1 &&
            message.user1Ready
          ) {
            setOtherPlayerReady(true);
          }
        });
      });
    }
  }, [connection]);

  const getGameProps = (): GameProps => {
    console.log(location.state);

    return {
      gameId: (location.state as ReadyCheckProps).gameId,
      isPlayer1: (location.state as ReadyCheckProps).isPlayer1,
    };
  };

  const onReady = async (): Promise<void> => {
    gameApi
      .gamesIdPost((location.state as ReadyCheckProps).gameId)
      .then(() => {
        setIsReady(true);
        if (otherPlayerReady) {
          history.push("/game", getGameProps());
        }
      })
      .catch(() => {
        present({
          buttons: [],
          message: "Failed to set ready status",
          color: "danger",
          cssClass: "toast-danger",
          duration: 2000,
        });
      });
  };

  return (
    <IonPage>
      <IonToolbar color="background">
        <div className="flex toolbar-container">
          <IonImg className="small-logo" src={Logo} />
        </div>
      </IonToolbar>
      <IonContent>
        <div className="ready-check-container">
          <p className="ready-text">
            Other player is {otherPlayerReady ? "ready" : "not ready"}
          </p>
          <p className="ready-text">
            You are {isReady ? "ready" : "not ready"}
          </p>
          <IonButton className="primary-button ready-button" onClick={onReady}>
            Ready for the challenge
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ReadyCheck;
