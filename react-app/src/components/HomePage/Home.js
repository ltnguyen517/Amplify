import React, { useState, useEffect } from "react";
import { Navlink, Link, useParams, useHistory } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import * as audioStore from '../../store/audioplayer';
import * as playlistStore from '../../store/playlist';
import './Home.css'

const HomePage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user)

    const [message, setMessage] = useState("")
    const [playlists, setPlaylists] = useState([])
    const [albums, setAlbums] = useState([])
    const [artists, setArtists] = useState([])

    document.body.style = 'background: #1e1e1e';

    let now = new Date();
    let currentTime = now.toLocaleString('en-US', { hour: 'numeric', hourCycle: "h24"})

    useEffect(() => {
        (async () => {
            const responseArtists = await fetch("/api/artists")
            const everyArtist = await responseArtists.json()
            setArtists(everyArtist.artists)
        })();
        (async () => {
            const responseAlbums = await fetch("/api/albums")
            const everyAlbum = await responseAlbums.json()
            setAlbums(everyAlbum.albums)
        })();
        (async () => {
            const everyPlaylist = await dispatch(playlistStore.getAllPlaylists())
            setPlaylists(everyPlaylist)
        })();
        if (currentTime < "12") {
            setMessage("Good morning there!")
        } else if (currentTime >= "12" && currentTime <= "17") {
            setMessage("Good afternoon there!")
        } else {
            setMessage("Good evening there!")
        }
    }, [setAlbums, setPlaylists, setArtists, dispatch, setMessage])

    if(!albums) return null;
    if(!playlists) return null;
    if(!artists) return null;

    return (
        <div className="home-mainbox">
            {sessionUser && (
                <h1>{message} {sessionUser.username}</h1>
            )}
            {!sessionUser && (
                <h1>{message}</h1>
            )}
            <h2>Artists</h2>
            <div className="artistarea">
                {artists.map((artist) => {
                    return <div className="artistpic" onClick={(e) => history.push(`/artist/${artist.id}`)}>
                        <Link to={`/artist/${artist.id}`}>
                            <img className="photoofartist" src={artist.artist_photo} />
                        </Link>
                        <span style={{ marginLeft: "25px", marginTop: "-50px", fontWeight: "600"}}>{artist.name}</span>
                    </div>
                })}
            </div>
            <br />
            <br />
            <br />
            <h2>Albums</h2>
            <div className="albumarea">
                {albums.map((album) => {
                    return <div className="albumpic" onClick={(e) => history.push(`/album/${album.id}`)}>
                        <Link to={`/album/${album.id}`}>
                            <img className="photoofalbum" src={album.AlbumPhoto} />
                        </Link>
                        <p style={{ marginLeft: "15px", fontWeight: "700"}}>{album.title}</p>
                        <span style={{marginLeft: "15px", paddingBottom: "20px"}}>{album.year} · {album.artist.name}</span>
                    </div>
                })}
            </div>
            <br />
            <br />
            <br />
            <h2>Playlists</h2>
            <div className="playlistarea" style={{paddingBottom: "80px"}}>
                {playlists && (
                    playlists.map((playlist) => {
                        return <div className="albumpic">
                            <Link to={`/playlist/${playlist.id}`}>
                                <img className="photoofplaylist" src={playlist.playlist_picture} />
                            </Link>
                            <p style={{ marginLeft: "27px", fontWeight: "700"}}>{playlist.title}</p>
                            <span style={{marginLeft: "27px", paddingBottom: "20px"}}>By {playlist.User.username}</span>
                        </div>
                    })
                )}
            </div>
        </div>
    )
}
export default HomePage;
