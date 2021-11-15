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
import { Link } from "react-router-dom";
import "./global.css";

import "./Register.css";

import LogoContainer from "../components/Logocontainer";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [present, dismiss] = useIonToast();

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
    //http://159.223.0.160/swagger/index.html
    axios
      .post("", {
        username: username,
        email: email,
        password: password,
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
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
            <IonLabel position="floating">username</IonLabel>{" "}
            <IonInput
              className="input-border"
              onIonChange={(e: any) => setUsername(e.target.value)}
            ></IonInput>
          </IonItem>
          <IonItem lines="none">
            <IonLabel position="floating">email</IonLabel>
            <IonInput
              className="input-border"
              type="email"
              onIonChange={(e: any) => setEmail(e.target.value)}
            ></IonInput>
          </IonItem>
          <IonItem lines="none">
            <IonLabel position="floating">password</IonLabel>
            <IonInput
              className="input-border"
              type="password"
              onIonChange={(e: any) => setPassword(e.target.value)}
            ></IonInput>
          </IonItem>
          <IonItem lines="none">
            <IonLabel position="floating">confirm password</IonLabel>
            <IonInput
              className="input-border"
              type="password"
              onIonChange={(e: any) => setConfirmPassword(e.target.value)}
            ></IonInput>
          </IonItem>
          <IonButton onClick={createUser}>Create account</IonButton>
          <div className=" flex login-container">
            <p className="dark"> Already have an account? </p>{" "}
            <Link to="/login">
              <IonButton className="login-button" fill="clear" color="dark">
                <strong>Login here</strong>
              </IonButton>
            </Link>
          </div>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Register;
