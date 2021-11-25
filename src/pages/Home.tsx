import {
  IonAvatar,
  IonButton,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonList,
  IonPage,
  IonSearchbar,
  IonToolbar,
  useIonAlert,
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
  PostGameResponse,
} from "../communication/models";
import Logo from "../assets/QuizLogo.png";

import defaultAvatar from "../assets/avatar/Avatar.png";
import LoadingPage from "../components/LoadingPage";
import "./Home.css";
import "./global.css";
import { useHistory, useLocation } from "react-router";
import { ReadyCheckProps } from "./ReadyCheck";
import { closeOutline } from "ionicons/icons";
import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";

interface StartGameFriendModel {
  id: string;
  username: string;
  avatar: string;
}
interface StartGameMessage {
  player1: StartGameFriendModel;
  player2: StartGameFriendModel;
  gameId: string;
}

const Home: React.FC = () => {
  const authApi = new AuthenticationApi();
  const usersApi = new UsersApi();
  const contactsApi = new ContactsApi();
  const gamesApi = new GamesApi();
  const history = useHistory();
  const [user, setUser] = useState<GetUserResponse>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [present] = useIonToast();
  const [alert] = useIonAlert();
  const [currentGame, setCurrentGame] = useState<PostGameResponse>(null);
  const [addFriendSearch, setAddFriendSearch] = useState<string>("");
  const [friendSearchResults, setFriendSearchResults] = useState<FriendModel[]>(
    []
  );
  const [challengeFriendSearch, setChallengeFriendSearch] =
    useState<string>("");
  const location = useLocation();
  const [friends, setFriends] = useState<FriendModel[]>([]);
  const [connection, setConnection] = useState<HubConnection>(null);
  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:5001/hubs/game")
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);
  useEffect(() => {
    if (connection) {
      connection.start().then(() => {
        connection.on("startGame", (message: StartGameMessage) => {
          const game: PostGameResponse = {
            id: message.gameId,
            isDone: false,
            user1: message.player1,
            user2: message.player2,
          };
          setCurrentGame(game);
        });
      });
    }
  }, [connection]);

  useEffect(() => {
    gamesApi.gamesGet().then((response) => {
      setCurrentGame(response.data);
    });
  }, []);

  useEffect(() => {
    if (user && currentGame) {
      const state: ReadyCheckProps = {
        gameId: currentGame.id,
        isPlayer1: currentGame.user1.username === user.username,
      };

      history.replace("/ready-check", state);
    }
  }, [currentGame, user]);

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

        history.replace("/login");
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

  const logoutUser = () => {
    authApi.authenticationLogoutPost().then(() => {
      present({
        buttons: [],
        message: "succesfully logged out",
        color: "success",
        cssClass: "toast-success",
        duration: 2000,
      });

      history.push({ pathname: "/empty" });
      history.replace({ pathname: "/login" });
    });
  };

  const sendFriendRequest = (friend: FriendModel) => {
    setAddFriendSearch("");
    const body: PostFriendRequest = {
      username: friend.username,
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

        const newFriend: FriendModel = {
          username: friend.username,
          avatar: friend.avatar,
        };
        const updatedFriends = friends.concat([newFriend]);
        setFriends(updatedFriends);
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
  };
  //TODO: get friend requests
  // useEffect(() => {
  //   contactsApi.contactsFriendRequestsGet().then((response) => {

  //   });
  // }, [friends]);

  const removeFriend = (username) => {
    alert({
      cssClass: "delete-alert",
      header: "Remove friend",
      message: `Do you want to remove ${username} as a friend? `,
      buttons: [
        {
          text: "Delete",
          role: "delete",
          cssClass: "delete-alert",
          handler: () => {
            contactsApi.contactsUsernameDelete(username).then(() => {
              const updatedFriends = friends.filter(
                (friend) => friend.username !== username
              );
              setFriends(updatedFriends);
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
  };

  const startGame = async (username) => {
    const body: PostGameRequest = {
      username,
    };
    gamesApi
      .gamesPost(body)
      .then((response) => {
        setCurrentGame(response.data);
      })
      .catch(() => {});
  };

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

          <div className="add-friend-search">
            <h2 className="title text-center">Add new friend</h2>
            <IonSearchbar
              className="searchbar"
              placeholder="username"
              value={addFriendSearch}
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
                        sendFriendRequest(friend);
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
                <IonCard key={friend.username} className="friend-card flex">
                  <div className="flex">
                    <IonAvatar className="small-avatar">
                      <IonImg className="avatar" src={defaultAvatar} />
                    </IonAvatar>
                    <p className="secondary">{friend.username}</p>
                  </div>{" "}
                  <div>
                    <IonButton
                      onClick={() => {
                        startGame(friend.username);
                      }}
                      fill="clear"
                      color="dark"
                    >
                      Play
                    </IonButton>
                    <IonButton
                      slot="end"
                      onClick={() => {
                        removeFriend(friend.username);
                      }}
                      size="small"
                      className="icon"
                      fill="clear"
                      color="dark"
                    >
                      <IonIcon icon={closeOutline} />
                    </IonButton>
                  </div>
                </IonCard>
              ))}
          </IonList>

          <IonButton
            onClick={() => {
              history.push("/settings");
            }}
            className="primary-button settings-button"
          >
            Settings
          </IonButton>
        </IonContent>
      )}
    </IonPage>
  );
};

export default Home;
