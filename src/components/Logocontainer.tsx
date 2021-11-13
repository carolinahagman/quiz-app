import { IonImg, IonTitle } from "@ionic/react";
import Logo from "../assets/QuizLogo.png";
import "./LogoContainer.css";

interface ContainerProps {}

const LogoContainer: React.FC<ContainerProps> = () => {
  return (
    <div className="container">
      <IonImg className="logo" src={Logo} />
      <IonTitle size="small">Challenge your friends!</IonTitle>
    </div>
  );
};

export default LogoContainer;
