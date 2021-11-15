import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  useIonViewDidEnter,
  useIonViewWillEnter,
  withIonLifeCycle,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { useState } from "react";
import React from "react";
import axios from "axios";

interface appState {
  isLoggedIn: boolean;
}

class App extends React.Component<{}, appState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoggedIn: false,
    } as appState;
  }
  async componentDidMount() {
    const isLoggedIn = await checkIfLoggedIn();
    console.log(isLoggedIn);
    this.setState({ ...this.state, isLoggedIn });
  }

  render() {
    return (
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/">
              <Redirect to={this.state.isLoggedIn ? "/home" : "/login"} />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    );
  }
}

export default App;
export function checkIfLoggedIn(): Promise<boolean> {
  return axios
    .get("http://159.223.0.160/Authentication")
    .then(() => true)
    .catch(() => false);
}
