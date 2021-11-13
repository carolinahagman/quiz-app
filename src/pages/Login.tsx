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
} from "@ionic/react";
import { useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import { registerRoute } from "workbox-routing";
import LogoContainer from "../components/Logocontainer";

import "./Login.css";
import { AuthenticationApi } from "../communication";
import { PostLoginRequest } from "../communication/models";

const Login: React.FC = () => {
  const api = new AuthenticationApi();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function loginUser() {
    console.log(username, password);

    const body: PostLoginRequest = {
      username,
      password,
    };

    //http://159.223.0.160/swagger/index.html
    // axios
    //   .post<PostLoginResponse>(
    //     "http://159.223.0.160/Authentication/Login",
    //     body
    //   )
    //   .then(
    //     (response) => {
    //       console.log(response);
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );

    api.authenticationLoginPost(body);
  }

  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent fullscreen>
        <LogoContainer />
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
          <p>
            Don’t have an account?
            <Link id="loginlink" to="/register">
              Create one here
            </Link>
          </p>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Login;
