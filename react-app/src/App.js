import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import PlaylistPage from "./components/Playlist/PlaylistPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import NavBar from "./components/Navbar/Navbar";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <><NavBar /><Switch>
          <Route path="/login" exact={true}>
            <LoginFormPage />
          </Route>
          <Route path="/signup" exact={true}>
            <SignupFormPage />
          </Route>
          <Route path="/playlist/:playlistId" exact={true}>
            <PlaylistPage />
          </Route>
        </Switch></>
      )}
    </>
  );
}

export default App;
