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
import Settings from "./pages/Settings";
import Game from "./pages/Game";
import Result from "./pages/Result";

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
import { BASE_PATH } from "./communication/base";
import ReadyCheck from "./pages/ReadyCheck";

class App extends React.Component<{}, {}> {
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
            <Route exact path="/settings">
              <Settings />
            </Route>
            <Route exact path="/game">
              <Game />
            </Route>
            <Route exact path="/result">
              <Result />
            </Route>
            <Route exact path="/ready-check">
              <ReadyCheck />
            </Route>
            <Route exact path="/">
              <Redirect to={"/login"} />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    );
  }
}

export default App;
