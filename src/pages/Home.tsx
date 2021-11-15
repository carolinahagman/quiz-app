import {
  IonAvatar,
  IonButton,
  IonCard,
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonList,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { AuthenticationApi, ContactsApi, UsersApi } from "../communication";
import { FriendModel, GetUserResponse } from "../communication/models";
import Logo from "../assets/QuizLogo.png";
import LoadingPage from "../components/LoadingPage";

import "./Home.css";
import "./global.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const authApi = new AuthenticationApi();
  const usersApi = new UsersApi();
  const contactsApi = new ContactsApi();
  const history = useHistory();
  const [user, setUser] = useState<GetUserResponse>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [present, dismiss] = useIonToast();
  const [addFriendSearch, setAddFriendSearch] = useState<string>("");
  const [friendSearchResults, setFriendSearchResults] = useState<FriendModel[]>(
    []
  );
  const [challengeFriendSearch, setChallengeFriendSearch] =
    useState<string>("");
  const [friends, setFriends] = useState<FriendModel[]>([]);

  useEffect(() => {
    const getUserRequest = usersApi
      .usersGet()
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
        present({
          buttons: [],
          message: "succesfully logged in",
          color: "success",
          cssClass: "toast-success",
          duration: 2000,
        });
      })
      .catch((error) => {
        present({
          buttons: [],
          message: "Error while getting logged in user",
          color: "danger",
          cssClass: "toast-danger",
          duration: 2000,
        });
      });
    const getFriendsRequest = contactsApi
      .contactsGet()
      .then((response) => {
        setFriends(response.data);
      })
      .catch((error) => {
        present({
          buttons: [],
          message: "Error while getting friends",
          color: "danger",
          cssClass: "toast-danger",
          duration: 2000,
        });
      });

    Promise.all([getUserRequest, getFriendsRequest]).finally(() => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    contactsApi.contactsSearchGet(addFriendSearch).then((response) => {
      setFriendSearchResults(response.data);
    });
  }, [addFriendSearch]);

  function logoutUser() {
    authApi.authenticationLogoutPost().then(() => {
      present({
        buttons: [],
        message: "succesfully logged out",
        color: "success",
        cssClass: "toast-success",
        duration: 2000,
      });
      history.push("/login");
    });
  }

  return (
    <IonPage>
      {isLoading ? (
        <IonContent fullscreen>
          <LoadingPage />
        </IonContent>
      ) : (
        <IonContent fullscreen>
          <IonHeader className="ion-no-border">
            <IonToolbar color="background">
              <div className="flex toolbar-container">
                <IonImg className="small-logo" src={Logo} />
                <IonButton className="primary-button" onClick={logoutUser}>
                  Log out
                </IonButton>
              </div>
            </IonToolbar>
          </IonHeader>
          <p>{user?.username ?? ""}</p>
          <div className="add-friend-search">
            <h2 className="title text-center">Add new friend</h2>
            <IonSearchbar
              className="searchbar"
              placeholder="username"
              onIonChange={(e: any) => setAddFriendSearch(e.detail.value)}
            ></IonSearchbar>
            {addFriendSearch ? (
              <IonItem lines="none">
                {friendSearchResults.map((friend) => (
                  <p>{friend.username}</p>
                ))}
              </IonItem>
            ) : null}
          </div>

          <div className="challenge-friend-search">
            <h2 className="title text-center">Challenge your friends</h2>
            <IonSearchbar
              className="searchbar"
              placeholder="username"
              onIonChange={(e: any) => setChallengeFriendSearch(e.detail.value)}
            ></IonSearchbar>
          </div>

          <IonList className="friend-list">
            {friends
              .filter((friend) =>
                challengeFriendSearch
                  ? friend.username.startsWith(challengeFriendSearch)
                  : true
              )
              .map((friend) => (
                <IonCard className="friend-card flex">
                  <div className="flex">
                    <IonCard className="small-avatar">
                      <IonImg
                        className="avatar"
                        src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
                      />
                    </IonCard>
                    <p>{friend.username}</p>
                  </div>{" "}
                  <IonButton fill="clear" color="dark">
                    Play
                  </IonButton>
                </IonCard>
              ))}
          </IonList>
          <Link to="/settings">
            <IonButton className="primary-button settings-button">
              Settings
            </IonButton>
          </Link>
        </IonContent>
      )}
    </IonPage>
  );
};

export default Home;
