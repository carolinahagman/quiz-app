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
} from "@ionic/react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function createUser() {
    if (password != confirmPassword) {
      alert("Password does not match");
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
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Register</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonItem>
          <IonLabel position="floating">username</IonLabel>
          <IonInput
            onIonChange={(e: any) => setUsername(e.target.value)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">email</IonLabel>
          <IonInput
            type="email"
            onIonChange={(e: any) => setEmail(e.target.value)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">password</IonLabel>
          <IonInput
            type="password"
            onIonChange={(e: any) => setPassword(e.target.value)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">confirm password</IonLabel>
          <IonInput
            type="password"
            onIonChange={(e: any) => setConfirmPassword(e.target.value)}
          ></IonInput>
        </IonItem>
        <IonButton onClick={createUser}>Create account</IonButton>
        <p>
          Already have an account?{" "}
          <Link id="registerlink" to="/login">
            {" "}
            Log in here{" "}
          </Link>
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Register;
