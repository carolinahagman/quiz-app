import {
  IonAvatar,
  IonButton,
  IonCard,
  IonContent,
  IonHeader,
  IonImg,
  IonList,
  IonPage,
  IonSearchbar,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { useEffect, useState } from "react";
import {
  AuthenticationApi,
  ContactsApi,
  GamesApi,
  UsersApi,
} from "../communication";
import {
  FriendModel,
  GetUserResponse,
  PostFriendRequest,
  PostGameRequest,
} from "../communication/models";
import Logo from "../assets/QuizLogo.png";
import defaultAvatar from "../assets/avatar/Avatar.png";
import LoadingPage from "../components/LoadingPage";
import "./Home.css";
import "./global.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const authApi = new AuthenticationApi();
  const usersApi = new UsersApi();
  const contactsApi = new ContactsApi();
  const gamesApi = new GamesApi();
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
      })
      .catch((error) => {
        present({
          buttons: [],
          message: "Error while getting logged in user",
          color: "danger",
          cssClass: "toast-danger",
          duration: 2000,
        });
        history.push("/login");
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

  function sendFriendRequest(username) {
    const body: PostFriendRequest = {
      username,
    };
    contactsApi
      .contactsPost(body)
      .then(() => {
        present({
          buttons: [],
          message: "Friend request sent!",
          color: "success",
          cssClass: "toast-success",
          duration: 2000,
        });
      })
      .catch(() => {
        present({
          buttons: [],
          message: "You've already sent a request",
          color: "danger",
          cssClass: "toast-danger",
          duration: 2000,
        });
      });
  }
  //TODO: get friend requests
  //TODO: get game challenge

  function startGame(username) {
    const body: PostGameRequest = {
      username,
    };
    console.log(`Game started with ${username}`);
    // gamesApi
    //   .gamesPost(body)
    //   .then(() => {})
    //   .catch(() => {});
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
              <IonList className="friend-list">
                {friendSearchResults.map((friend) => (
                  <IonCard key={friend.username} className="friend-card flex">
                    <div className="flex">
                      <IonAvatar className="small-avatar">
                        <IonImg className="avatar" src={defaultAvatar} />
                      </IonAvatar>
                      <p className="secondary">{friend.username}</p>
                    </div>{" "}
                    <IonButton
                      onClick={() => {
                        sendFriendRequest(friend.username);
                      }}
                      fill="clear"
                      color="dark"
                    >
                      Add
                    </IonButton>
                  </IonCard>
                ))}
              </IonList>
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
                    <IonAvatar className="small-avatar">
                      <IonImg className="avatar" src={defaultAvatar} />
                    </IonAvatar>
                    <p className="secondary">{friend.username}</p>
                  </div>{" "}
                  <IonButton
                    onClick={() => {
                      startGame(friend.username);
                    }}
                    fill="clear"
                    color="dark"
                  >
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
