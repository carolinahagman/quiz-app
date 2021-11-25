import {
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonItem,
  IonLabel,
  IonButton,
  IonCard,
  useIonToast,
} from "@ionic/react";
import { useState } from "react";

import axios from "axios";
import LogoContainer from "../components/Logocontainer";
import "./global.css";
import "./Login.css";
import { AuthenticationApi } from "../communication";
import { PostLoginRequest, PostLoginResponse } from "../communication/models";

import { useHistory } from "react-router-dom";
import { BASE_PATH } from "../communication/base";

const Login: React.FC = () => {
  const api = new AuthenticationApi();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [present, dismiss] = useIonToast();
  const history = useHistory();

  const loginUser = () => {
    const body: PostLoginRequest = {
      username,
      password,
    };
    api.authenticationLoginPost(body).then(
      () => {
        history.push("/home");
      },
      () => {
        present({
          buttons: [],
          message: "Login failed, wrong username or password",
          color: "danger",
          cssClass: "toast-danger",
          duration: 2000,
        });
      }
    );
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <LogoContainer />
      </IonHeader>
      <IonContent scrollY={false} fullscreen>
        <IonCard className="form ">
          <IonItem lines="none">
            <IonLabel position="floating" color="secondary">
              username
            </IonLabel>
            <IonInput
              className="input-border"
              onIonChange={(e: any) => setUsername(e.target.value)}
            ></IonInput>
          </IonItem>
          <IonItem lines="none">
            <IonLabel position="floating" color="secondary">
              password
            </IonLabel>
            <IonInput
              className="input-border"
              type="password"
              onIonChange={(e: any) => setPassword(e.target.value)}
            ></IonInput>
          </IonItem>
          <IonButton
            className="primary-button login-register-button"
            onClick={loginUser}
          >
            Log in
          </IonButton>
          <div className=" flex create-account-container">
            <IonButton
              onClick={() => {
                history.push("/register");
              }}
              className="create-account-button"
              fill="clear"
              color="dark"
            >
              <p className="button-text">Don’t have an account?</p>
            </IonButton>
          </div>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Login;
