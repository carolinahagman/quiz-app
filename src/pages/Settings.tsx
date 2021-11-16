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
  IonAvatar,
} from "@ionic/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./global.css";
import "./Settings.css";
import LogoContainer from "../components/Logocontainer";
import { UsersApi } from "../communication";
import { PostUserRequest, PutUserRequest } from "../communication/models";
import Logo from "../assets/QuizLogo.png";
import defaultAvatar from "../assets/avatar/Avatar.png";

const Settings: React.FC = () => {
  const usersApi = new UsersApi();
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState<string>("email@email.com");
  const [avatar, setAvatar] = useState<string>(defaultAvatar);
  const [oldPassword, setOldPassword] = useState<string>(null);
  const [newPassword, setNewPassword] = useState<string>(null);
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>(null);
  const [present, dismiss] = useIonToast();
  const [alert] = useIonAlert();

  useEffect(() => {
    usersApi.usersGet().then((response) => {
      setUser(response.data);
      setEmail(user.email);
    });
  }, []);

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
      setEmail(user.email);
    }

    if (newPassword != confirmNewPassword) {
      present({
        buttons: [],
        message: "password does not match",
        color: "danger",
        cssClass: "toast-danger",
        duration: 2000,
      });
      setNewPassword(null);
      setConfirmNewPassword(null);

      return;
    }

    if (newPassword.length < 6) {
      present({
        buttons: [],
        message: "password needs to be at least 6 characters",
        color: "danger",
        cssClass: "toast-danger",
        duration: 2000,
      });
    }
    const body: PutUserRequest = {
      username: user.username,
      email: email,
      avatar: avatar,
      oldPassword: oldPassword,
      password: newPassword,
    };
    usersApi.usersPut(body).then((response) => {
      console.log(response.data);
    });
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
        <IonAvatar className="big-avatar">
          <IonImg className="avatar" src={avatar} />
        </IonAvatar>

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
