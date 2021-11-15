import {
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonButton,
  IonTextarea,
  IonImg,
  IonList,
  IonCard,
  useIonToast,
} from "@ionic/react";
import { useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import axios, { Axios } from "axios";
import { registerRoute } from "workbox-routing";
import LogoContainer from "../components/Logocontainer";

import "./Login.css";
import { AuthenticationApi } from "../communication";
import { PostLoginRequest, PostLoginResponse } from "../communication/models";
import { checkIfLoggedIn } from "../App";
import { useHistory } from "react-router-dom";

const Login: React.FC = () => {
  const api = new AuthenticationApi();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [present, dismiss] = useIonToast();
  const history = useHistory();

  function loginUser() {
    const body: PostLoginRequest = {
      username,
      password,
    };
    api.authenticationLoginPost(body).then(
      (response) => {
        history.push("/home");
      },
      (error) => {
        present({
          buttons: [],
          message: "Login failed, wrong username or password",
          color: "danger",
          cssClass: "toast-danger",
          duration: 2000,
        });
      }
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <LogoContainer />
      </IonHeader>
      <IonContent fullscreen>
        <IonCard className="form">
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
          <IonButton onClick={loginUser}>Log in</IonButton>
          <div className="flex create-account-container">
            <p>Don’t have an account?</p>{" "}
            <IonButton
              href="/register"
              className="create-account-button"
              fill="clear"
              color="dark"
            >
              <strong>Create one here</strong>
            </IonButton>
          </div>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Login;
