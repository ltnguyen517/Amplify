import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import PlaylistPage from "./components/Playlist/PlaylistPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import NavBar from "./components/Navbar/Navbar";
import HomePage from "./components/HomePage/Home";
import SongsLiked from "./components/SongsLiked/SongsLiked";
import UserProfilePage from "./components/UserProfilePage/UserProfilePage";
import AudioPlayerComponent from "./components/Audioplayer/Audioplayer";
import Error404Page from "./components/ErrorPage/ErrorPage";
import ArtistPg from "./components/Artists/Artists";
import Albums from "./components/Albums/Albums";
import SearchBar from "./components/SearchBar/SearchBar";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginFormPage />
        </Route>
        <Route path="/signup" exact={true}>
          <SignupFormPage />
        </Route>
        <Route path="/audio">
          <AudioPlayerComponent />
        </Route>
        <Route path='/likes'>
          <SongsLiked />
        </Route>
        <Route path='/search'>
          <SearchBar />
        </Route>
        <Route path='/artist/:artistId' exact={true}>
          <ArtistPg />
        </Route>
        <Route path='/playlist/:playlistId' exact={true}>
          <PlaylistPage />
        </Route>
        <Route path='/album/:albumId' exact={true}>
          <Albums />
        </Route>
        <Route path='/user/:userId' exact={true}>
          <UserProfilePage />
        </Route>
        <Route path='/' exact={true}>
          <HomePage />
        </Route>
        <Route path="*">
          <Error404Page />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

// function App() {
//   const dispatch = useDispatch();
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     dispatch(authenticate()).then(() => setIsLoaded(true));
//   }, [dispatch]);

//   return (
//     <>
//       <Navigation isLoaded={isLoaded} />
//       {isLoaded && (
//         <><NavBar /><Switch>
//           <Route path="/login" exact={true}>
//             <LoginFormPage />
//           </Route>
//           <Route path="/signup" exact={true}>
//             <SignupFormPage />
//           </Route>
//           <Route path="/playlist/:playlistId" exact={true}>
//             <PlaylistPage />
//           </Route>
//         </Switch></>
//       )}
//     </>
//   );
// }

// export default App;
