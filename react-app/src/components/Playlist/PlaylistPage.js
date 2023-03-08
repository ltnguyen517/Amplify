import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, useHistory, useLocation, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import * as actionthunksPlaylist from "../../store/playlist";
import * as followingPlaylistAct from "../../store/followingplaylist"
import * as audioplayerActions from "../../store/audioplayer"
import UpdatePlaylistModal from "./UpdatePlaylistModal";
import "./PlaylistPage.css"

export default function PlaylistPage(){
    const history = useHistory()
    const dispatch = useDispatch()
    let { playlistId } = useParams()
    const location = useLocation()
    let nav = document.getElementById("headnavbar")

    const [aPlaylist, setAPlaylist] = useState([])
    const [showMenu, setShowMenu] = useState(false)
    const [activeMenu, setActiveMenu] = useState()
    const [canSee, setCanSee] = useState(false)
    const [addedToQueue, setAddedToQueue] = useState(false)
    const [edit, setEdit] = useState(true)
    const [playlistsFollowing, setPlaylistsFollowing] = useState([])
    const playlistState = useSelector((state) => state.playlist)
    const followingPlaylistState = useSelector((state) => state.followingPlaylist)
    const sessionUser = useSelector((state) => state.session.user)

    let i = 0

    useEffect(async () => {
        if(!playlistState) return null

        (async () => {
            if(sessionUser){
                const followingPlaylistsDetails = await dispatch(followingPlaylistAct.getAllPlFollowed(sessionUser.id))
                await setPlaylistsFollowing(followingPlaylistsDetails.followingPlaylist)
            }
        })();
        setAPlaylist(await dispatch(actionthunksPlaylist.getAPlaylist(playlistId)))
        await dispatch(actionthunksPlaylist.getAllPlaylists())
    }, [dispatch, playlistId, setPlaylistsFollowing, edit, setEdit, setAPlaylist, sessionUser?.id])

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener("click", closeMenu);

    }, [showMenu]);

    const playlistArr = Object.values(playlistState)
    const playlist = playlistArr.filter(playlist => Number(playlist.id) === Number(playlistId))[0]

    if (location.pathname.includes("playlist") && nav && playlist) {
        nav.style.backgroundImage = `url(${playlist.playlist_picture})`
        nav.style.backgroundSize = "0.5px 0.5px"
    }

    document.body.style = 'background: #1e1e1e';

    let userPlaylists
    let lengthUserPlaylists
    let onlyOneUniqueUserPlaylist

    if(sessionUser){
        userPlaylists = playlistArr.filter(playlist => playlist?.User?.id === sessionUser.id)
        lengthUserPlaylists = userPlaylists.length + 1
        onlyOneUniqueUserPlaylist = userPlaylists.filter(playlist => playlist.id !== Number(playlistId))
    }

    const removePlaylist = async (e) => {
        setEdit(true)
        e.preventDefault()
        const removed = await dispatch(actionthunksPlaylist.deletePlaylist(playlistId))
        if(removed){
            history.push("/")
            await dispatch(actionthunksPlaylist.getAllPlaylists())
        }
    }
    if(!playlistId) return null

    const siftSongCount = () => {
        i = i + 1
        return i
    }

    const openMenu = () => {
        if(showMenu) return
        setShowMenu(true)
    }

    let followButton
    let followedPlaylistsArr = Object.values(followingPlaylistState)

    if (sessionUser) {
        if (followedPlaylistsArr.length >= 1) {
            if (!!aPlaylist.User) {
                if (followedPlaylistsArr.some((e) => e.id === Number(playlistId))) {
                    followButton = (
                        <button hidden={sessionUser?.id === aPlaylist?.User?.id} onClick={(e) => { unfollowPlaylist(e); setEdit(!edit); }} style={{ backgroundColor: "#1e1e1e", border: "none", cursor: "pointer" }}>
                            <i style={{ color: "#1ed760" }} class="fa-solid fa-heart fa-2x"></i>
                        </button>
                    )
                } else {
                    followButton = (
                        <button hidden={sessionUser.id === aPlaylist.User.id} onClick={(e) => { followPlaylist(e); setEdit(!edit); }} style={{ backgroundColor: "#1e1e1e", border: "none", cursor: "pointer" }}>
                            <i style={{ color: "#babbbb" }} class="fa-regular fa-heart fa-2x"></i>
                        </button>
                    )
                }
            }
        } else {
            followButton = (
                <button hidden={sessionUser?.id === aPlaylist?.User?.id} onClick={(e) => { followPlaylist(e); setEdit(!edit); }} style={{ backgroundColor: "#1e1e1e", border: "none", cursor: "pointer" }}>
                    <i style={{ color: "#babbbb" }} class="fa-regular fa-heart fa-2x"></i>
                </button>
            )
        }
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

    const followPlaylist = async (e) => {
        e.preventDefault()
        setEdit(true)
        await dispatch(followingPlaylistAct.followPlaylist(sessionUser.id, playlistId))
        await dispatch(followingPlaylistAct.getAllPlFollowed(sessionUser.id))
    }
    const unfollowPlaylist = async (e) => {
        e.preventDefault()
        setEdit(true)
        await dispatch(followingPlaylistAct.unfollowPlaylist(sessionUser.id, Number(playlistId)))
        await dispatch(followingPlaylistAct.getAllPlFollowed(sessionUser.id))
    }

    const listenPlaylist = async (e) => {
        e.preventDefault()
        await dispatch(audioplayerActions.addPlaylist(playlistId))
    }

    return (
        <>
            {!!aPlaylist.User && (
                <div className="playlistarea" style={{color:"white"}}>
                    {sessionUser?.id === aPlaylist?.User?.id && (
                        <UpdatePlaylistModal playlistId={playlistId} playlist={playlist} aPlaylist={aPlaylist} />
                    )}
                    {sessionUser?.id !== aPlaylist?.User?.id && (
                        <div className="plheader" style={{backgroundImage: `url(${playlist.playlist_picture})`, backgroundSize: "0.5px 0.5px", width: "109%", paddingBottom: "40px"}}>
                            <div className="plpicarea" style={{paddingLeft: "30px", paddingTop: "23px"}}>
                                <img className="plpic" src={playlist.playlist_picture} />
                            </div>
                            <div className="plinfoarea" style={{marginTop: "50px"}}>
                                <div className="pltext" style={{fontSize: "13px"}}>
                                    PLAYLIST
                                </div>
                                <div className="pltitle" style={{fontSize: "65px", fontWeight: "700", textDecoration: "none"}}>
                                    {playlist.title}
                                </div>
                                <div className="pldescription">
                                    {playlist.description}
                                </div>
                                <div>
                                    <Link style={{textDecoration: "none", color: "white"}} to={`/user/${aPlaylist?.User?.id}`}>
                                        {aPlaylist?.User?.username}
                                    </Link>
                                    <span style={{fontSize: "20px"}}>·</span>
                                    {aPlaylist?.Songs && (
                                        <span>{aPlaylist?.Songs?.length} songs</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="plcontainer" style={{paddingLeft: "30px"}}>
                        <div>
                            <button hidden={!sessionUser || aPlaylist?.Songs?.length === 0} onClick={listenPlaylist} style={{ backgroundColor: "#1e1e1e", border: "none", cursor: "pointer", marginTop: "6px" }}>
                                <i style={{ color: "#1ed760" }} class="fa-solid fa-circle-play fa-4x"></i>
                            </button>
                        </div>
                        <div style={{ marginBottom: "45px", marginLeft: "60px", marginTop: "10px" }}>
                            {followButton}
                        </div>
                        <div style={{ marginBottom: "40px"}}>
                            {sessionUser && (
                                <button className="pldeletebutton" hidden={sessionUser.id !== aPlaylist?.User?.id} onClick={(e) => {removePlaylist(e); setEdit(!edit);}}>DELETE</button>
                            )}
                        </div>
                    </div>
                    <div className="songsheader" style={{paddingLeft: "30px", marginRight: "-95px"}}>
                        <div className="number">
                            <div>
                                #
                                &nbsp;
                                &nbsp;
                                Title
                            </div>
                        </div>
                        <div style={{ marginRight: "-95px"}}>
                            Album
                        </div>
                        <div style={{paddingRight: "70px"}}>
                            <i class="fa-regular fa-clock"></i>
                        </div>
                    </div>
                    {aPlaylist.Songs && (
                        <div style={{marginTop: "1.5vh", paddingLeft: "30px"}}>
                            {aPlaylist.Songs.map((song) => {
                            return <div className="plsongholder" style={{ paddingBottom: "10px", listStyle: "none", display: "flex", justifyContent: "space-between" }}>
                                    <div style={{ width: "305px" }}>
                                        {sessionUser && (
                                            <>
                                                {siftSongCount()}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link onClick={async (e) => await dispatch(audioplayerActions.addSong(song.id))} style={{ textDecoration: "none", color: "white" }}>{song.name}</Link>
                                            </>
                                        )}
                                        {!sessionUser && (
                                            <>
                                                {siftSongCount()}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link to="/login" style={{ textDecoration: "none", color: "white" }}>{song.name}</Link>
                                            </>
                                        )}
                                    </div>
                                    <div style={{ marginLeft: "-95px" }}><Link style={{ textDecoration: "none", color: "white" }} to={`/album/${song.album.id}`}>{song.album.title}</Link></div>
                                    <div>
                                        <span style={{width:"50px"}}>{song.duration}</span>
                                        <button style={{background: "none"}} className="dropdown-songs" onClick={(e) => activeMenu === song.id ? setActiveMenu(null) : setActiveMenu(song.id)}>...</button>
                                        {activeMenu === song.id && (
                                            <div className='active-playlist-song-dropdown'>
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
                                                        await dispatch(audioplayerActions.nextSong(song.id)); setAddedToQueue(true); setTimeout(() => {
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
                                                        <div style={{ borderBottom: "1px solid #808080", marginBottom: "5px" }}></div>
                                                        {onlyOneUniqueUserPlaylist.map((playlist) => {
                                                            return <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                                                <button className="create-playlist-button-dropdown" onClick={async (e) => {
                                                                    await fetch(`/api/playlists/${playlist.id}/insertsong/${song.id}`, {
                                                                        method: "POST"
                                                                    });
                                                                    setCanSee(true)
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
                            })}
                        </div>
                    )}
                    {canSee && (
                        <div style={{ marginTop: "300px" }} id='song-added-div' hidden>
                            <div style={{ display: "flex", alignItems: "center", fontWeight: "700" }}>Added to Playlist</div>
                        </div>
                    )}
                    {addedToQueue && (
                        <div style={{ marginTop: "300px" }} id='song-added-div' hidden>
                            <div style={{ display: "flex", alignItems: "center", fontWeight: "700" }}>Added to Queue</div>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}
