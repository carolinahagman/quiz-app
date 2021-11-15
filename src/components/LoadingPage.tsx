import { IonImg, IonTitle } from "@ionic/react";
import loading from "../assets/loading.gif";
import "./LoadingPage.css";

interface ContainerProps {}

const LoadingPage: React.FC<ContainerProps> = () => {
  return (
    <div className="loading-container">
      <IonImg className="loading" src={loading} />
    </div>
  );
};

export default LoadingPage;
