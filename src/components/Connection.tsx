import { IonContent, IonImg, IonPage, IonTitle } from "@ionic/react";
import loading from "../assets/loading.gif";
import "./Connection.css";

interface ContainerProps {
  username;
}

const Connection: React.FC<ContainerProps> = (props) => {
  return (
    <IonContent>
      <div className="loading-container">
        <p>
          Waiting for <strong> {props.username}</strong> to accept the challenge
        </p>
        <IonImg className="loading" src={loading} alt="animated Q loading" />
      </div>
    </IonContent>
  );
};

export default Connection;
