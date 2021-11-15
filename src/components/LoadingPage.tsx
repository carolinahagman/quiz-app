import { IonImg, IonTitle } from "@ionic/react";
import Loading from "../assets/QuizLogo.png";
import "./LogoContainer.css";

interface ContainerProps {}

const LoadingPage: React.FC<ContainerProps> = () => {
  return (
    <div className="container">
      <IonImg className="logo" src={Loading} />
    </div>
  );
};

export default LoadingPage;
