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
import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import axios, { Axios } from "axios";
import { registerRoute } from "workbox-routing";
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

  // useEffect(() => {
  //   checkIfLoggedIn().then(() => {
  //     history.push("/home");
  //   });
  // }, []);

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
      <IonHeader className="ion-no-border">
        <LogoContainer />
      </IonHeader>
      <IonContent fullscreen>
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
          <div className="flex create-account-container">
            <p className="secondary">Don’t have an account?</p>
            <Link to="/register">
              <IonButton
                className="create-account-button"
                fill="clear"
                color="dark"
              >
                <p className="button-text">Create one here</p>
              </IonButton>
            </Link>
          </div>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export async function checkIfLoggedIn(): Promise<boolean> {
  try {
    await axios.get(`${BASE_PATH}/Authentication`);
    return true;
  } catch (e) {
    return false;
  }
}

export default Login;
