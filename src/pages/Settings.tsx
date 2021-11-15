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
  IonImg,
  useIonAlert,
} from "@ionic/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./global.css";
import "./Settings.css";
import LogoContainer from "../components/Logocontainer";
import { UsersApi } from "../communication";
import { PostUserRequest } from "../communication/models";
import Logo from "../assets/QuizLogo.png";
import defaultAvatar from "../assets/avatar/Avatar.png";

const Settings: React.FC = () => {
  const usersApi = new UsersApi();
  const history = useHistory();
  const [user, setUser] = useState<object>(null);
  const [email, setEmail] = useState<string>("email@email.com");
  const [avatar, setAvatar] = useState<string>(defaultAvatar);
  const [oldpassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [present, dismiss] = useIonToast();
  const [alert] = useIonAlert();

  function updateUser() {
    console.log("user updated");

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

    if (newPassword != confirmNewPassword) {
      present({
        buttons: [],
        message: "password does not match",
        color: "danger",
        cssClass: "toast-danger",
        duration: 2000,
      });
      return;
    }
  }

  function deleteUser() {
    alert({
      cssClass: "delete-alert",
      header: "DELETE",
      message: "Are you sure you want to delete your account?",
      buttons: [
        {
          text: "Delete",
          role: "delete",
          cssClass: "delete-alert",
          handler: () => {
            usersApi.usersDelete().then((response) => {
              console.log(response);
              present({
                buttons: [],
                message: "Account succesfully deleted",
                color: "success",
                cssClass: "toast-success",
                duration: 2000,
              });
              history.push("/login");
            });
          },
        },
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "delete-alert",
          handler: () => {
            console.log("Cancelled");
          },
        },
      ],
    });
  }
  return (
    <IonPage className="flex-start">
      <IonToolbar color="background" className="toolbar-container">
        <IonImg className="small-logo" src={Logo} />
      </IonToolbar>
      <IonCard className="form settings-card">
        <IonCard className="big-avatar">
          <IonImg className="avatar" src={avatar} />
        </IonCard>

        <IonItem lines="none">
          <IonLabel color="secondary" position="floating">
            update email
          </IonLabel>
          <IonInput
            className="input-border"
            type="email"
            value={email}
            onIonChange={(e: any) => setEmail(e.target.value)}
          ></IonInput>
        </IonItem>
        <IonItem lines="none">
          <IonLabel color="secondary" position="floating">
            old password
          </IonLabel>
          <IonInput
            className="input-border"
            type="password"
            onIonChange={(e: any) => setOldPassword(e.target.value)}
          ></IonInput>
        </IonItem>
        <IonItem lines="none">
          <IonLabel color="secondary" position="floating">
            new password
          </IonLabel>
          <IonInput
            className="input-border"
            type="password"
            onIonChange={(e: any) => setNewPassword(e.target.value)}
          ></IonInput>
        </IonItem>
        <IonItem lines="none">
          <IonLabel color="secondary" position="floating">
            confirm new password
          </IonLabel>
          <IonInput
            className="input-border"
            type="password"
            onIonChange={(e: any) => setConfirmNewPassword(e.target.value)}
          ></IonInput>
        </IonItem>
        <div className="button-container">
          <IonButton
            color="danger"
            className="primary-button"
            onClick={deleteUser}
          >
            Delete
          </IonButton>{" "}
          <IonButton className="primary-button" onClick={updateUser}>
            Update
          </IonButton>
        </div>
      </IonCard>
      <Link to="/home">
        {" "}
        <IonButton className="primary-button settings-button">
          Home
        </IonButton>{" "}
      </Link>
    </IonPage>
  );
};

export default Settings;
