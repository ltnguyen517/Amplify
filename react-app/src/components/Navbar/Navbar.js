import React, {useEffect, useRef, useState} from "react";
import { NavLink, Link, useParams, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actionthunksPlaylist from "../../store/playlist";
import * as followingPlaylistAct from "../../store/followingplaylist";
import * as audioplayerActions from "../../store/audioplayer"
import AudioPlayerComponent from "../Audioplayer/Audioplayer";
import PlaylistsOfUser from "../PlaylistsOfUser/PlaylistsOfUser";
import ProfileDropDown from "../ProfileDropDown/ProfileDropDown";
import logo from "./logo.png";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import "./Navbar.css";

const NavBar = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const sessionUser = useSelector((state) => state.session.user)
    let nav = document.getElementById("topnavbar")
    const playlistState = useSelector((state) => state.playlist)
    const followingPlaylistState = useSelector((state) => state.followingPlaylist)
    const [isDisabled, setIsDisabled] = useState(false)
    const audioState = useSelector((state) => state.audioplayer)
    const [playlistsFollowing, setPlaylistsFollowing] = useState([])
    const [playlistsUser, setPlaylistsUser] = useState([])

    let playlists
    let followingPlaylist

    useEffect(async () => {
        playlists = await dispatch(actionthunksPlaylist.getAllPlaylists())
        await dispatch(followingPlaylistAct.getAllPlFollowed(sessionUser?.id))
    }, [dispatch, sessionUser?.id])

    if (location.pathname === "/" && nav) {
        nav.style.background = "#111111"
        nav.style.backgroundImage = "none"
    }
    if (location.pathname === "/login" && nav) {
        nav.style.background = "white"
    }

    const playlistArr = Object.values(playlistState || {})
    const followedPlaylistsArr = Object.values(followingPlaylistState || {})

    let userPlaylists
    let lengthUserPlaylists

    if(sessionUser){
        userPlaylists = playlistArr.filter(playlist => playlist?.User?.id === sessionUser?.id)
        lengthUserPlaylists = userPlaylists.length + 1
    }

    // last left off

    let sidenav
    let navbar
    let bottomnav

    const createPlaylist = async (e) => {
        if(lengthUserPlaylists > 6){
            return window.alert("You're only able to create a maximum of 6 playlists")
        }
        e.preventDefault()
        const brandNewPlaylist = {
            "creator_id": sessionUser.id,
            "title": `My Playlist #${lengthUserPlaylists}`,
            "description": "Write a description for your new playlist here.",
            "playlist_picture": "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999"
        }

      let new_playlist = await dispatch(actionthunksPlaylist.createPlaylist(brandNewPlaylist))
      if (new_playlist) {
        history.push(`/playlist/${new_playlist.id}`)
        setIsDisabled(true)
        setTimeout(() => setIsDisabled(false), 500)
      }
    }
    if (location.pathname === "/likes") {
      sidenav = (
        <div className='sidenav' style={{ color: "#adb3b3" }}>

          <Link to="/" style={{ textDecoration: "none" }}>
            <i class="fa-solid fa-house" style={{ color: "#b3b3b3" }}></i>
            &nbsp;
            Home</Link>


          <br />
          <button className='createplaylist-button' onClick={createPlaylist} disabled={isDisabled}>
            <i class="fa-solid fa-square-plus"></i>
            &nbsp;
            Create playlist
          </button>
          &nbsp;
          <Link to="/likes">
            <i class="fa solid fa-heart" style={{marginLeft: "20px"}}></i>
            &nbsp;
            Liked Songs
          </Link>
          <div style={{ borderBottom: "1px solid gray" }}><br /></div>
          <br />
          <div style={{ overflowY: "scroll" }}>
            <div className="userplaylistclass">
              <PlaylistsOfUser />
              {followedPlaylistsArr && (
                followedPlaylistsArr.map((playlist) => {
                  return <div>
                    <Link to={`/playlist/${playlist.id}`}>{playlist.title}</Link>
                  </div>
                })
              )}
            </div>
          </div>
        </div>
      )
      navbar = (
        <nav id="topnavbar" style={{ backgroundColor: "#1e1e1e", backgroundImage: "none" }}>
          <div style={{ marginRight: "20px" }}>
            <Link to={{ pathname: "https://github.com/ltnguyen517/Amplify" }} target="_blank">
              <i style={{ color: "#1ed760", marginTop: "25px" }} class="fa-brands fa-github fa-lg"></i>
            </Link>
          </div>
          <div className="loginsignup" style={{marginRight: "120px"}}>
            <ProfileDropDown />
          </div>
        </nav>
      )
      if (audioState?.current_song.length > 0) {
        bottomnav = (
          audioState.current_song.length > 0 && (
            <div className='bottom-div-container'>
              <div className='audio-container' style={{ display: "flex", marginLeft: "20px" }}>
                <div className='bottom-nav-image-container' style={{ display: "flex" }}>
                  <img style={{ width: "80px" }} src={audioState.current_song[0].album.album_photo}></img>
                  <div className='bottom-div-album-name-artist-container' style={{ display: "flex", flexDirection: "column", marginLeft: "20px", marginTop: "15px", width: "300px" }}>
                    <Link id='bottomnav-album-link' to={`/album/${audioState.current_song[0].album.id}`}>{audioState.current_song[0].name}</Link>
                    <Link id="bottomnavartist" to={`/artist/${audioState.current_song[0].album.artist.id}`}>{audioState.current_song[0].album.artist.name}</Link>
                  </div>
                </div>
                <div style={{ marginLeft: "50px" }}>
                  <AudioPlayerComponent />
                </div>
              </div>
            </div>
          )
        )
      } else {
        bottomnav = (
          <div className='bottom-div-container'>
            <div style={{ marginLeft: "230px" }}>
              <AudioPlayerComponent/>
            </div>
          </div>
        )
      }
    }
    if (location.pathname !== "/signup" && location.pathname !== "/login" && !sessionUser) {
      sidenav = (
        <div className='sidenav' style={{ color: "#adb3b3" }}>
          <div style={{ marginBottom: "5px" }} id='logo'>
            <img onClick={(e) => history.push("/")} style={{ width: "150px", height: "75px", cursor: "pointer", marginLeft: "11.5px" }} src={logo} />
          </div>
          <div>
            <Link to="/" style={{ textDecoration: "none" }}>
              <i class="fa-solid fa-house" style={{ color: "#b3b3b3" }}></i>
              &nbsp;
              Home</Link>
              <br />
          </div>
          <div>
            <Link to="/login">
              <i class="fa-solid fa-square-plus"></i>
              &nbsp;
              Create Playlist
            </Link>
          </div>
        </div>
      )
      navbar = (
        <nav id="topnavbar" style={{backgroundColor: "#1e1e1e"}}>
          <div style={{ marginRight: "15px", marginTop: "15px" }}>
            <Link to={{ pathname: "https://github.com/ltnguyen517/Amplify" }} target="_blank">
              <i style={{ color: "#1ed760" }} class="fa-brands fa-github fa-lg"></i>
            </Link>

          </div>
          <div className='loginsignup' style={{ display: "flex", marginRight: "12px" }}>
            <div style={{ paddingTop: "8px", marginRight: "10px" }}>
              <button style={{ fontSize: "17px", fontWeight: "700", background: "none" }} id='signupnav-button' onClick={(e) => history.push("/signup")}>
                Sign Up
              </button>
            </div>
            <button id='loginnav-button' onClick={(e) => history.push("/login")}>
              Login
            </button>
          </div>
        </nav>
      )
      bottomnav = (
        <div className='loggedoutbottomdiv-container'>
          <div className='logged-out-text'>
            &nbsp;
            <div style={{ fontSize: "12px", marginLeft: "12px", marginBottom: "4px" }}>
              PREVIEW OF AMPLIFY
            </div>
            <div style={{ marginLeft: "12px", fontWeight: "528" }}>
              Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.
            </div>
          </div>
          <button style={{ marginTop: "15px", borderRadius: "30px", height: "44px", width: "140px", fontWeight: "700", border: "none", cursor: "pointer", marginRight: "5px" }} onClick={(e) => history.push("/signup")}>Sign up free</button>
        </div>
      )
    } else if (sessionUser && location.pathname !== "/signup" && location.pathname !== "/login" && location.pathname !== "/likes") {
      sidenav = (
        <div className='sidenav' style={{ color: "#adb3b3" }}>
          <div style={{ marginBottom: "5px" }} id='logo'>
            <img onClick={(e) => history.push("/")} style={{ width: "150px", height: "75px", cursor: "pointer", marginLeft: "11.5px" }} src={logo} />
          </div>

          <Link to="/" style={{ textDecoration: "none" }}>
            <i class="fa-solid fa-house" style={{ color: "#b3b3b3" }}></i>
            &nbsp;
            Home</Link>

          <br />
          <button className='createplaylist-button' onClick={createPlaylist} disabled={isDisabled}>
            <i class="fa-solid fa-square-plus"></i>
            &nbsp;
            Create Playlist
          </button>

          <br />
          <Link to="/likes">
            <i class="fa-solid fa-heart"></i>
            &nbsp;
            Liked Songs
          </Link>
          <div style={{ borderBottom: "1px solid gray" }}><br /></div>
          <br />
          <div style={{ overflowY: "scroll" }}>
            <div className='userplaylistclass'>
              <PlaylistsOfUser />
              {followedPlaylistsArr && (
                followedPlaylistsArr.map((playlist) => {
                  return <div>
                    <Link to={`/playlist/${playlist.id}`}>{playlist.title}</Link>
                  </div>
                })
              )}
            </div>
          </div>
        </div>
      )
      navbar = (
        <nav id="topnavbar" style={{backgroundColor: "#1e1e1e"}}>
          <div className='loginsignup' style={{ marginRight: "115px" }}>
            <ProfileDropDown />
          </div>
        </nav>
      )
      if (audioState?.current_song.length > 0) {
        bottomnav = (
          audioState.current_song.length > 0 && (
            <div className='bottom-div-container'>
              <div className='audio-container' style={{ display: "flex", marginLeft: "20px" }}>
                <div className='bottom-nav-image-container' style={{ display: "flex" }}>
                  <img style={{ width: "80px" }} src={audioState.current_song[0].album.album_photo}></img>
                  <div className='bottom-div-album-name-artist-container' style={{ display: "flex", flexDirection: "column", marginLeft: "20px", marginTop: "15px", width: "300px" }}>
                    <Link id='bottomnav-album-link' to={`/album/${audioState.current_song[0].album.id}`}>{audioState.current_song[0].name}</Link>
                    <Link id="bottomnavartist" to={`/artist/${audioState.current_song[0].album.artist.id}`}>{audioState.current_song[0].album.artist.name}</Link>
                  </div>
                </div>
                <div style={{ marginLeft: "50px" }}>
                  <AudioPlayerComponent />
                </div>
              </div>
            </div>
          )
        )
      } else {
        bottomnav = (
          <div className='bottom-div-container'>
            <div style={{ marginLeft: "230px" }}>
              <AudioPlayerComponent/>
            </div>
          </div>
        )
      }
    } else if (location.pathname === "/login") {
      navbar = (
        <nav id='logginginsigningup-nav'>
          <div id="login-signup-page">
            <Link to="/">
              <img className='logoimg' src={logo}></img>
            </Link>
          </div>
        </nav>
      )
    }

    return (
      <>
        {navbar}
        {sidenav}
        {bottomnav}
      </>
    );
}

export default NavBar;
