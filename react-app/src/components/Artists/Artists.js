import React, {useState, useEffect} from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Error404Page from "../ErrorPage/ErrorPage";
import * as likeSongStore from "../../store/likedsongs";
import * as actionthunksPlaylist from "../../store/playlist";
import * as audioplayerActions from "../../store/audioplayer"
import "./Artists.css"

export default function ArtistPg(){
    let nav = document.getElementById("topnavbar")
    const history = useHistory()
    const dispatch = useDispatch()
    let { artistId } = useParams()
    const location = useLocation()

    const sessionUser = useSelector((state) => state.session.user)
    const playlistState = useSelector((state) => state.playlist)
    const songsLiked = useSelector((state) => state.songsLikedReducer)

    const [artist, setArtist] = useState([])
    const [showMenu, setShowMenu] = useState(false)
    const [activeMenu, setActiveMenu] = useState(false)
    const [canSee, setCanSee] = useState(false)
    const [addedToQueue, setAddedToQueue] = useState(false)
    const [edit, setEdit] = useState(true)
    const [songs, setSongs] = useState([])
    const [songsLikedList, setSongsLikedList] = useState([])

    let i = 0

    useEffect(() => {
        (async () => {
            if(artistId <= 6){
                const artistRes = await fetch(`/api/artists/${artistId}`)
                const artistData = await artistRes.json()
                setArtist(artistData)
            }
        })();
        (async () => {
            const songRes = await fetch(`/api/artists/${artistId}/songs`)
            const songData = await songRes.json()
            setSongs(songData.Albums[0].Songs)
        })();
        (async () => {
            if(artistId <= 6){
                if(sessionUser){
                    setSongsLikedList(await dispatch(likeSongStore.getAllLikes(sessionUser.id)))
                }
            }
        })();
    }, [setArtist, setSongs, edit, setEdit, dispatch, artistId, sessionUser, setSongsLikedList])

    useEffect(() => {
        if (!showMenu) return;
        if (!activeMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
            setActiveMenu(false);
        };
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener("click", closeMenu);

    }, [showMenu, activeMenu]);

    if (location.pathname.includes("artist") && nav) {
        nav.style.backgroundImage = `url(${artist.artist_photo})`
        nav.style.backgroundSize = "0.5px 0.5px"
    }

    document.body.style = 'background: #1e1e1e';

    if(artistId <= 0 || artistId > 6){
        return (
            <Error404Page />
        )
    }

    let userPlaylists
    let lengthUserPlaylists

    if(sessionUser){
        const playlistArr = Object.values(playlistState)
        userPlaylists = playlistArr.filter(playlist => playlist?.User?.id === sessionUser.id)
        lengthUserPlaylists = userPlaylists.length + 1
    }

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
        await dispatch(actionthunksPlaylist.createPlaylist(brandNewPlaylist))
    }

    const openMenu = () => {
        if(showMenu) return
        setShowMenu(true)
    }

    const popularSongs = songs.slice(0, 5)

    const siftSongCount = () => {
        i = i + 1
        return i
    }

    const likeASong = async (e, id) => {
        e.preventDefault()
        setEdit(true)
        await dispatch(likeSongStore.userLikeSong(sessionUser.id, id))
        await dispatch(likeSongStore.getAllLikes(sessionUser.id))
    }

    const unlikeASong = async (e, id) => {
        e.preventDefault()
        setEdit(true)
        await dispatch(likeSongStore.userUnlikeSong(sessionUser.id, id))
        await dispatch(likeSongStore.getAllLikes(sessionUser.id))
    }

    return (
        <div className='artistmain' style={{ overflowX: "hidden", paddingBottom: "80px", width: "110%" }}>
            <div className='headerforartist' style={{ backgroundImage: `url(${artist.artist_photo})`, backgroundRepeat: "no-repeat", backgroundSize: "100% 500px", objectFit: "contain"  }}>
                <h1 style={{ fontSize: "70px", marginLeft: "65px", color: "white", marginTop: "150px", textShadow: "3px 3px 2px rgba(0, 0, 0, 1)" }}>{artist.name}</h1>
            </div>
            <div className='artistdeets' style={{ marginLeft: "40px" }}>
                <h2 style={{ color: "white" }}>Popular</h2>
                <div className='artistpopularsongsarea' style={{ marginRight: "50px" }}>
                    {!!songs && (
                        popularSongs.map((song) => {
                            return <div className='asong' style={{ color: 'white', display: "flex", justifyContent: "space-between", marginLeft: "20px" }}>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    {sessionUser && (
                                        <>
                                            <div style={{ width: "10px" }}>{siftSongCount()}</div>&nbsp;<img style={{ width: "40px" }} src={song.album.AlbumPhoto} />&nbsp;<button onClick={async (e) => await dispatch(audioplayerActions.addSong(song.id))} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>{song.name}</button>
                                        </>
                                    )}
                                    {!sessionUser && (
                                        <>
                                            <div style={{ width: "10px" }}>{siftSongCount()}</div>&nbsp;<img style={{ width: "40px" }} src={song.album.AlbumPhoto} />&nbsp;<button onClick={(e) => history.push("/login")} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>{song.name}</button>
                                        </>
                                    )}
                                </div>
                                &nbsp;
                                &nbsp;
                                <div style={{ display: "flex" }}>
                                    {sessionUser && (
                                        songsLikedList?.SongsLiked?.some(e => e.id === song.id) ? <i onClick={(e) => { unlikeASong(e, song.id); setEdit(!edit) }} style={{ paddingRight: "20px", color: "#1ed760", cursor: "pointer" }} class="fa-solid fa-heart"></i> : <i onClick={(e) => { likeASong(e, song.id); setEdit(!edit) }} style={{ paddingRight: "20px", color: "#babbbb", cursor: "pointer" }} class="fa-regular fa-heart"></i>
                                    )}
                                    <span style={{ width: "40px" }}>{song.duration}</span>
                                    <div>
                                        <button style={{ background: "none", outline: "none", border: "none", color: "white", cursor: "pointer"}} className='dropdown-songs' onClick={(e) => activeMenu === song.id ? setActiveMenu(null) : setActiveMenu(song.id)}>···</button>
                                        {activeMenu === song.id && (
                                            <div className='dotssong-dropdown'>
                                                <div>
                                                    <Link className="yes" to={`/album/${song.album.id}`}>Album Page</Link>
                                                    <br />
                                                    {sessionUser && (
                                                        <button className="add-to-queue-button" onClick={async (e) => {
                                                            await dispatch(audioplayerActions.nextSong(song.id));
                                                            setAddedToQueue(true)
                                                            setTimeout(() => {
                                                                setAddedToQueue(false)
                                                            }, 2000)
                                                        }}>Add to queue</button>
                                                    )}
                                                </div>
                                                <div style={{marginLeft: "-8px"}}>
                                                    {sessionUser && (
                                                        <button className='add-song-to-playlist-button' onClick={openMenu} >Add song to playlist</button>
                                                    )}
                                                    {showMenu && (
                                                        <div className='add-song-dropdown'>
                                                            <button className="create-playlist-button-dropdown" onClick={createPlaylist}>Create Playlist</button>
                                                            <div style={{ borderBottom: "1px solid white" }}></div>
                                                            {userPlaylists.map((playlist) => {
                                                                return <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                                                    <button className="create-playlist-button-dropdown" onClick={async (e) => {
                                                                        await fetch(`/api/playlists/${playlist.id}/insertsong/${song.id}`, {
                                                                            method: "POST"
                                                                        });
                                                                        setCanSee(true)
                                                                        setTimeout(() => {
                                                                            setCanSee(false)
                                                                        }, 2000)
                                                                    }}>{playlist.title}</button>
                                                                </div>
                                                            })}
                                                        </div>
                                                    )}

                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        })
                    )}
                    {canSee && (
                        <div id='song-added-div' hidden>
                            <div style={{ display: "flex", alignItems: "center", fontWeight: "700" }}>Added to Playlist</div>
                        </div>
                    )}
                    {addedToQueue && (
                        <div id='song-added-div' hidden>
                            <div style={{ display: "flex", alignItems: "center", fontWeight: "700", zIndex: "999" }}>Added to Queue</div>
                        </div>
                    )}
                </div>
            </div>
            <div className='discography' style={{ marginLeft: "40px" }}>
                <h2 style={{ color: "white" }}>Discography</h2>
                <div className='artistalbums'>
                    {artist?.Albums && (
                        artist.Albums.map((album) => {
                            return <div onClick={(e) => history.push(`/album/${album?.id}`)} className='album-box' style={{ cursor: "pointer", width: "fit-content" }}>
                                <div className='albumimg'>
                                    <img className='album-photo' src={songs[0]?.album?.AlbumPhoto} style={{maxHeight:"135px", objectFit: "contain", maxWidth: "135px", marginLeft: "15px"}}/>
                                    <p style={{ marginLeft: "15px", fontWeight: "700", color: "white", fontSize: "16px" }}>{album.title}</p>
                                    <p style={{ marginLeft: "15px", color: "gray", fontSize: "13px"}}>{album.year} · Album</p>
                                </div>
                            </div>
                        })
                    )}
                </div>
            </div>
        </div>
    )
}
