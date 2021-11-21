import { IonButton, IonContent, IonPage, useIonToast } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { GamesApi } from "../communication";
import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";
import Connection from "../components/Connection";
import { GameProps } from "./Game";

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
      history.push("/game", getGameProps());
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
      <IonContent>
        <h1>Other player is {otherPlayerReady ? "Ready" : "Not ready"}</h1>
        <h1>You are {isReady ? "Ready" : "Not ready"}</h1>
        <IonButton onClick={onReady}>Ready</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ReadyCheck;
