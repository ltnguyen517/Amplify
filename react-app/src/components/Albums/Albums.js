import React, { useState, useEffect } from 'react';
import { Link, NavLink, useHistory, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actionthunksPlaylist from "../../store/playlist"
import * as audioplayerActions from "../../store/audioplayer"
import * as likeSongStore from '../../store/likedsongs';
import Error404Page from '../ErrorPage/ErrorPage';
import "./Albums.css"


const Albums = () => {
    let nav = document.getElementById("topnavbar")
    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()

    const [album, setAlbum] = useState([])
    const { albumId } = useParams()
    const [showMenu, setShowMenu] = useState(false)
    const [activeMenu, setActiveMenu] = useState(false)
    const [canSee, setCanSee] = useState(false)
    const [addedToQueue, setAddedToQueue] = useState(false)
    const [edit, setEdit] = useState(true)
    const [songsLikedList, setSongsLikedList] = useState([])

    const sessionUser = useSelector((state) => state.session.user)
    const playlistState = useSelector((state) => state.playlist)
    const songsLiked = useSelector((state) => state.songsLikedReducer)

    let i = 0;
    document.body.style = 'background: #1e1e1e';

    useEffect(() => {
        (async () => {
            if (albumId <= 6) {
                const albumRes = await fetch(`/api/albums/${albumId}`)
                const albumData = await albumRes.json()
                setAlbum(albumData)

                if (sessionUser) {
                    setSongsLikedList(await dispatch(likeSongStore.getAllLikes(sessionUser.id)))
                }
            }
        })();
    }, [setAlbum, albumId, edit, setEdit, sessionUser, dispatch, setSongsLikedList]);

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

    if(albumId <= 0 || albumId > 6){
        return (
            <Error404Page />
        )
    }

    if (location.pathname.includes("album") && nav) {
        nav.style.backgroundImage = `url(${album.AlbumPhoto})`
        nav.style.backgroundSize = "0.5px 0.5px"
    }

    let userPlaylists
    let lengthUserPlaylists

    if(sessionUser){
        const playlistArr = Object.values(playlistState)
        userPlaylists = playlistArr.filter(playlist => playlist?.User?.id === sessionUser.id)
        lengthUserPlaylists = userPlaylists.length + 1
    }

    const siftSongCount = () => {
        i = i + 1
        return i
    }

    const openMenu = () => {
        if(showMenu) return
        setShowMenu(true)
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

    const playAlbum = async (e) => {
        e.preventDefault()
        await dispatch(audioplayerActions.addAlbum(albumId))
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
        <>
        {!!album && (
                <div className='albumpagewholearea' style={{ color: "white", paddingBottom: "100px", marginRight: "30px", width: "103%" }}>
                    <div className='album-top' style={{ backgroundImage: `url(${album.AlbumPhoto})`, backgroundSize: "0.5px 0.5px", display: "flex", flexDirection: "row", width: "109%", paddingBottom: "20px" }}>
                        <div style={{ width: "260px", height: "250px", paddingLeft: "35px", marginTop: "35px" }}>
                            <img id='albumpageimg' style={{ width: "250px", height: "250px" }} src={album?.AlbumPhoto}></img>
                        </div>
                        <div className='albumdeets' style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 1)", marginTop: "110px", marginLeft: "20px", display: "flex", flexDirection: "column" }}>
                            ALBUM
                            <div className='album-title' style={{ fontSize: "80px", fontWeight: "600" }}>
                                {album?.title}
                            </div>
                            <br/>
                            <div className='albumartist'>
                                <Link style={{ textDecoration: "none", color: "white" }} to={`/artist/${album?.artist?.id}`}>{album?.artist?.name}</Link><span style={{ marginLeft: "5px" }}>·</span> {album?.year} <span>·</span> {album?.Songs?.length} songs
                            </div>
                        </div>
                    </div>
                    <div style={{ paddingLeft: "10px", marginTop: "20px" }} className='playlike-container'>
                        <div>
                            <button hidden={!sessionUser} onClick={playAlbum} style={{ backgroundColor: "#1e1e1e", border: "none", cursor: "pointer" }}>
                                <i style={{ color: "#1ed760" }} class="fa-solid fa-circle-play fa-4x"></i>
                            </button>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className='songsheader' style={{ paddingLeft: "30px", marginRight: "-95px", paddingRight: "90px" }}>
                        <div className='number-icon'>
                            <div>
                                #
                                &nbsp;
                                &nbsp;
                                Title
                            </div>
                        </div>
                        <div style={{ paddingRight: "20px" }}>
                            <i class="fa-regular fa-clock"></i>
                        </div>
                    </div>
                    <div style={{ paddingLeft: "30px", paddingTop: "1.5vh" }}>
                        {album?.Songs?.map((song) => {
                            return <div className='song-album-container' style={{ paddingBottom: "10px", listStyle: "none", display: "flex", justifyContent: "space-between" }}>
                                <div style={{ width: "300px", display: "flex", flexDirection: "row" }}>
                                    {siftSongCount()}
                                    &nbsp;
                                    &nbsp;
                                    &nbsp;
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        {sessionUser && (
                                            <Link onClick={async (e) => await dispatch(audioplayerActions.addSong(song.id))} style={{ textDecoration: "none", color: "white" }}>{song.name}</Link>
                                        )}
                                        {!sessionUser && (
                                            <Link to="/login" style={{ textDecoration: "none", color: "white" }}>{song.name}</Link>
                                        )}
                                        <Link style={{ textDecoration: "none", color: "gray", marginTop: "10px", fontSize: "13.5px" }} to={`/artist/${album.artist.id}`}>{album.artist.name}</Link>
                                    </div>
                                </div>
                                <div style={{ display: "flex", marginRight: "-40px" }}>
                                    {sessionUser && (
                                        songsLikedList?.SongsLiked?.some(e => e.id === song.id) ? <i onClick={(e) => { unlikeASong(e, song.id); setEdit(!edit) }} style={{ paddingRight: "20px", color: "#1ed760", cursor: "pointer" }} class="fa-solid fa-heart"></i> : <i onClick={(e) => { likeASong(e, song.id); setEdit(!edit) }} style={{ paddingRight: "20px", color: "#babbbb", cursor: "pointer" }} class="fa-regular fa-heart"></i>
                                    )}
                                    <span style={{ width: "50px" }}>{song.duration}</span>
                                    <div>
                                        <button style={{ background: "none", outline: "none", border: "none", color: "white", cursor: "pointer" }} id='song-dropdown' onClick={(e) => activeMenu === song.id ? setActiveMenu(null) : setActiveMenu(song.id)}>···</button>
                                        {activeMenu === song.id && (
                                            <div className='active-playlist-song-dropdown' style={{width: "110px", marginLeft: "-90px", marginTop: "5px"}}>
                                                <div>
                                                    {sessionUser && (
                                                        <Link className="yes" to={`/album/${song.album.id}`}>Album Page</Link>
                                                    )}
                                                    {!sessionUser && (
                                                        <Link className="logged-out-album-page" to={`/album/${song.album.id}`}>Album Page</Link>
                                                    )}
                                                    <br />
                                                    {sessionUser && (
                                                        <button className="add-to-queue-button" onClick={async (e) => {
                                                            await dispatch(audioplayerActions.nextSong(song.id));
                                                            setAddedToQueue(true)
                                                            setTimeout(() => {
                                                                setAddedToQueue(false)
                                                            }, 1500)

                                                        }}>Add to queue</button>
                                                    )}
                                                </div>
                                                <div>
                                                    {sessionUser && (
                                                        <button className='add-song-to-playlist-button' onClick={openMenu}>Add to playlist</button>
                                                    )}
                                                    {showMenu && (
                                                        <div className='add-song-dropdown'>
                                                            <button className="create-playlist-button-dropdown" onClick={createPlaylist}>Create Playlist</button>
                                                            <div style={{ borderBottom: "1px solid #808080", marginBottom: "5px"  }}></div>
                                                            {userPlaylists.map((playlist) => {
                                                                return <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                                                    <button className="create-playlist-button-dropdown" onClick={async (e) => {
                                                                        await fetch(`/api/playlists/${playlist.id}/insertsong/${song.id}`, {
                                                                            method: "POST"
                                                                        });
                                                                        setCanSee(true);
                                                                        setTimeout(() => {
                                                                            setCanSee(false)
                                                                        }, 1500)
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
                        })}
                        {canSee && (
                            <div id='song-added-div' hidden>
                                <div style={{ display: "flex", alignItems: "center", fontWeight: "700" }}>Added to Playlist</div>
                            </div>
                        )}
                        {addedToQueue && (
                            <div id='song-added-div' hidden>
                                <div style={{ display: "flex", alignItems: "center", fontWeight: "700" }}>Added to Queue</div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )


}

export default Albums;
