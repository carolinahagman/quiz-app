import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { UsersApi } from "../communication";
import { GetUserResponse } from "../communication/models";
import "./Home.css";

const Home: React.FC = () => {
  const usersApi = new UsersApi();
  const [user, setUser] = useState<GetUserResponse>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [present, dismiss] = useIonToast();

  useEffect(() => {
    usersApi
      .usersGet()
      .then((response) => {
        setUser(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        present({
          buttons: [],
          message: "Error while getting logged in user",
          color: "danger",
          cssClass: "toast-danger",
          duration: 2000,
        });
        setIsLoading(false);
      });
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar>
            <IonTitle size="large">
              {(user && user.username) || "No username"}
            </IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default Home;
