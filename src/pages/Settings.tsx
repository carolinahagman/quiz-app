import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonToolbar,
  IonCard,
  useIonToast,
  IonImg,
  useIonAlert,
  IonAvatar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./global.css";
import "./Settings.css";
import { UsersApi } from "../communication";
import { PostUserRequest, PutUserRequest } from "../communication/models";
import Logo from "../assets/QuizLogo.png";
import defaultAvatar from "../assets/avatar/Avatar.png";
import LoadingPage from "../components/LoadingPage";

const Settings: React.FC = () => {
  const usersApi = new UsersApi();
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState<string>("email@email.com");
  const [avatar, setAvatar] = useState<string>(defaultAvatar);
  const [oldPassword, setOldPassword] = useState<string>(null);
  const [newPassword, setNewPassword] = useState<string>(null);
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [present] = useIonToast();
  const [alert] = useIonAlert();

  useEffect(() => {
    usersApi.usersGet().then((response) => {
      setUser(response.data);
      setEmail(response.data.email);
      setIsLoading(false);
    });
  }, []);

  function updateUser() {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      present({
        buttons: [],
        message: "not a valid email",
        color: "danger",
        cssClass: "toast-danger",
        duration: 2000,
      });
      setEmail(user.email);
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
      setNewPassword(null);
      setConfirmNewPassword(null);

      return;
    }

    const body: PutUserRequest = {
      username: user.username,
      email: email,
      avatar: avatar,
      oldPassword: oldPassword,
      password: newPassword,
    };
    usersApi
      .usersPut(body)
      .then(() => {
        present({
          buttons: [],
          message: "account succesfully updated",
          color: "success",
          cssClass: "toast-success",
          duration: 2000,
        });
      })
      .catch(() => {
        present({
          buttons: [],
          message: "password needs to be at least 6 characters",
          color: "danger",
          cssClass: "toast-danger",
          duration: 2000,
        });
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
        },
      ],
    });
  }
  return (
    <IonPage className="flex-start">
      <IonToolbar color="background">
        <div className="flex toolbar-container">
          <IonImg className="small-logo" src={Logo} />
        </div>
      </IonToolbar>
      {isLoading ? (
        <IonContent fullscreen>
          <LoadingPage />
        </IonContent>
      ) : (
        <IonContent>
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
              </IonButton>
              <IonButton className="primary-button" onClick={updateUser}>
                Update
              </IonButton>
            </div>
          </IonCard>
          <Link to="/home">
            <IonButton className="primary-button settings-button">
              Home
            </IonButton>
          </Link>
        </IonContent>
      )}
    </IonPage>
  );
};

export default Settings;
