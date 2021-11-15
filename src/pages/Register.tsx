import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
  IonCard,
  useIonToast,
} from "@ionic/react";
import axios from "axios";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./global.css";
import "./Register.css";
import LogoContainer from "../components/Logocontainer";
import { UsersApi } from "../communication";
import { PostUserRequest } from "../communication/models";

const Register: React.FC = () => {
  const usersApi = new UsersApi();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [present, dismiss] = useIonToast();
  const history = useHistory();

  function createUser() {
    if (password.length < 6) {
      present({
        buttons: [],
        message: "password needs to be at least 6 characters",
        color: "danger",
        cssClass: "toast-danger",
        duration: 2000,
      });
      return;
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      present({
        buttons: [],
        message: "not a valid email",
        color: "danger",
        cssClass: "toast-danger",
        duration: 2000,
      });
      return;
    }

    if (password != confirmPassword) {
      present({
        buttons: [],
        message: "password does not match",
        color: "danger",
        cssClass: "toast-danger",
        duration: 2000,
      });
      return;
    }

    console.log(username, email, password, confirmPassword);
    const body: PostUserRequest = {
      username,
      email,
      password,
    };
    usersApi.usersPost(body).then(
      (response) => {
        console.log(response);
        history.push("/login");
      },
      (error) => {
        present({
          buttons: [],
          message: "username or email already exists",
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
        <IonCard className="form">
          <IonItem lines="none">
            <IonLabel color="secondary" position="floating">
              username
            </IonLabel>{" "}
            <IonInput
              className="input-border"
              onIonChange={(e: any) => setUsername(e.target.value)}
            ></IonInput>
          </IonItem>
          <IonItem lines="none">
            <IonLabel color="secondary" position="floating">
              email
            </IonLabel>
            <IonInput
              className="input-border"
              type="email"
              onIonChange={(e: any) => setEmail(e.target.value)}
            ></IonInput>
          </IonItem>
          <IonItem lines="none">
            <IonLabel color="secondary" position="floating">
              password
            </IonLabel>
            <IonInput
              className="input-border"
              type="password"
              onIonChange={(e: any) => setPassword(e.target.value)}
            ></IonInput>
          </IonItem>
          <IonItem lines="none">
            <IonLabel color="secondary" position="floating">
              confirm password
            </IonLabel>
            <IonInput
              className="input-border"
              type="password"
              onIonChange={(e: any) => setConfirmPassword(e.target.value)}
            ></IonInput>
          </IonItem>
          <IonButton
            className="primary-button login-register-button"
            onClick={createUser}
          >
            Create account
          </IonButton>
          <div className=" flex login-container">
            <p className="secondary"> Already have an account? </p>{" "}
            <Link to="/login">
              <IonButton className="login-button" fill="clear" color="dark">
                <p className="button-text">Login here</p>
              </IonButton>
            </Link>
          </div>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Register;
