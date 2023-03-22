import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import * as likedSongsStore from "../../store/likedsongs"
import * as audioStore from "../../store/audioplayer"
import * as playlistStore from "../../store/playlist"
import "./SongsLiked.css"

const SongsLiked = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user)
    const playlistState = useSelector((state) => state.playlist)
    const songsLiked = useSelector((state) => state.songsLikedReducer)

    const [songsLikedArr, setSongsLikedArr] = useState([])
    const [edit, setEdit] = useState(true)
    const [showMenu, setShowMenu] = useState(false)
    const [activeMenu, setActiveMenu] = useState()
    const [canSee, setCanSee] = useState(false)
    const [addToQueue, setAddToQueue] = useState(false)

    let i = 0
    let songsLikedState

    useEffect(async () => {
        if (sessionUser){
            songsLikedState = await dispatch(likedSongsStore.getAllLikes(sessionUser.id))
            setSongsLikedArr(songsLikedState)
        }
    }, [dispatch, edit, setEdit, sessionUser, setSongsLikedArr, songsLikedState])

    useEffect(() => {
        if(!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const playlistArr = Object.values(playlistState || {})
    let userPlaylists
    let lengthUserPlaylists

    if(sessionUser){
        userPlaylists = playlistArr.filter(playlist => playlist?.User?.id === sessionUser?.id)
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
        await dispatch(playlistStore.createPlaylist(brandNewPlaylist))
    }

    const siftSongCount = () => {
        i = i + 1
        return i
    }

    const openMenu = () => {
        if(showMenu) return
        setShowMenu(true)
    }

    const unlikeSong = async (e, id) => {
        setEdit(true)
        e.preventDefault()
        await dispatch(likedSongsStore.userUnlikeSong(sessionUser.id, id))
        setSongsLikedArr(await dispatch(likedSongsStore.getAllLikes(sessionUser.id)))
    }

    const waitingOnSongLikes = async (e) => {
        e.preventDefault()
        await dispatch(audioStore.addLikes(sessionUser.id))
    }

    if (songsLikedArr?.SongsLiked?.length >= 1){
        return (
            <div className='songslikedarea' style={{ color: "white", paddingBottom: "80px", width: "100%" }}>
                <div className='songslikedhead' style={{ display: "flex", paddingLeft: "60px", paddingTop: "50px", paddingBottom: "20px" }}>
                    <div className='likedsongdefaultimg' style={{ marginBottom: "10px" }}>
                        <img src='https://misc.scdn.co/liked-songs/liked-songs-300.png' style={{ height: "100%" }}></img>
                    </div>
                    <div className='songsliked-info' style={{ marginLeft: "20px", display: "flex", flexDirection: "column" }}>
                        <h1 style={{ color: "white", fontSize: "13px", marginBottom: "-50px", marginTop: "70px" }}>PLAYLIST</h1>
                        <h1 style={{ fontSize: "75px", fontWeight: "700" }}>Liked Songs</h1>
                        <span><Link style={{ textDecoration: "none", color: "white" }} to={`/user/${sessionUser.id}`}>{sessionUser.username}</Link>{songsLikedArr.SongsLiked.length} songs</span>
                    </div>
                </div>
                <div className='playbutton' style={{ paddingLeft: "60px", height: "100px" }}>
                    <div>
                        <button style={{ border: "none", background: "none" }}>
                            <i style={{ color: "#1ed760", cursor: "pointer" }} onClick={waitingOnSongLikes} class="fa-solid fa-circle-play fa-4x"></i>
                        </button>
                    </div>
                </div>
                <div className='songsheadarea' style={{ paddingLeft: "30px", marginRight: "-95px" }}>
                    <div className='titlealbumicon'>
                        <div>
                            #
                            &nbsp;
                            &nbsp;
                            TITLE
                        </div>
                    </div>
                    <div>
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        ALBUM
                    </div>
                    <div style={{ paddingRight: "20px" }}>
                        <i class="fa-regular fa-clock"></i>
                    </div>
                </div>
                <div className='allsongsliked' style={{ marginLeft: "20px", marginTop: "1.5vh" }}>
                    {songsLikedArr.SongsLiked && (
                        <div>
                            {songsLikedArr.SongsLiked.map((song) => {
                                return <div className='likedsongs-playlist' style={{ paddingBottom: "10px", listStyle: "none", display: "flex", justifyContent: "space-between" }}>
                                    <div style={{ width: "300px", marginLeft: "10px", display: "flex", alignItems: "center" }}>
                                        <div style={{ width: "10px" }}>{siftSongCount()}</div>&nbsp;&nbsp;<img style={{ width: "30px" }} src={song.album.AlbumPhoto} />&nbsp;&nbsp;<Link onClick={async (e) => await dispatch(audioStore.addSong(song.id))} style={{ textDecoration: "none", color: "white" }}>{song.name}</Link>
                                    </div>
                                    <div style={{ marginLeft: "-70px" }}><Link style={{ textDecoration: "none", color: "white" }} to={`/album/${song.album.id}`}>{song.album.title}</Link></div>
                                    <div style={{ display: "flex", marginRight: "-75px" }}>
                                        <i onClick={(e) => { unlikeSong(e, song.id); setEdit(!edit) }} style={{ paddingRight: "20px", color: "#1ed760", cursor: "pointer" }} class="fa-solid fa-heart"></i>
                                        <span style={{ width: "50px" }}>{song.duration}</span>
                                        {sessionUser && (
                                            <button style={{ background: "none", marginBottom: "20px" }} id='dropdownofspecificsong' onClick={(e) => activeMenu === song.id ? setActiveMenu(null) : setActiveMenu(song.id)}>...</button>
                                        )}
                                        {activeMenu === song.id && (
                                            <div className='dropdownofplaylistsongs'>
                                                <div>
                                                    <Link className="albumpg" to={`/album/${song.album.id}`}>Album Page</Link>
                                                    <br />
                                                    {sessionUser && (
                                                        <button className="button-to-addtoqueue" onClick={async (e) => {
                                                            await dispatch(audioStore.nextSong(song.id)); setAddToQueue(true); setTimeout(() => {
                                                                setAddToQueue(false)
                                                            }, 2000)
                                                        }} >Add to queue</button>
                                                    )}
                                                </div>
                                                <div>
                                                    {sessionUser && (
                                                        <button className='buttontoaddsongtoPL' onClick={openMenu}>Add song to playlist</button>
                                                    )}
                                                    {showMenu && (
                                                        <div className='songadddropdown'>
                                                            <button className="createpl-button" onClick={createPlaylist}>Create Playlist</button>
                                                            <div style={{ borderBottom: "1px solid white" }}></div>
                                                            {userPlaylists.map((playlist) => {
                                                                return <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                                                    <button className="createpl-button" onClick={async (e) => {
                                                                        await fetch(`/api/playlists/${playlist.id}/insertsong/${song.id}`, {
                                                                            method: "POST"
                                                                        });
                                                                        setCanSee(true);
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
                            })}
                        </div>
                    )}
                </div>
                {canSee && (
                    <div style={{ marginTop: "300px" }} id='songadded' hidden>
                        <div style={{ display: "flex", alignItems: "center", fontWeight: "700" }}>Added to Playlist</div>
                    </div>
                )}
                {addToQueue && (
                    <div style={{ marginTop: "300px" }} id='songadded' hidden>
                        <div style={{ display: "flex", alignItems: "center", fontWeight: "700" }}>Added to Queue</div>
                    </div>
                )}
            </div>
        )
    } else {
        return (
            <div className='songslikedarea' style={{ color: "white", paddingBottom: "80px", width: "100%" }}>
                <div className='songslikedhead' style={{ display: "flex", paddingLeft: "60px", paddingTop: "50px", paddingBottom: "20px" }}>
                    <div className='likedsongdefaultimg' style={{ marginBottom: "10px" }}>
                        <img src='https://misc.scdn.co/liked-songs/liked-songs-300.png' style={{ height: "235px" }}></img>
                    </div>
                    <div className='songsliked-info' style={{ marginLeft: "20px", display: "flex", flexDirection: "column" }}>
                        <h1 style={{ color: "white", fontSize: "14px", marginBottom: "-50px", marginTop: "70px" }}>PLAYLIST</h1>
                        <h1 style={{ fontSize: "74px", fontWeight: "700"}}>Liked Songs</h1>
                        <Link onClick={(e) => history.push(`/user/${sessionUser.id}`)} style={{color:"white", textDecoration: "none", marginLeft: "3px"}}>{sessionUser.username}</Link>
                    </div>
                </div>
                <div className='playbutton' style={{ paddingLeft: "60px", height: "100px" }}>
                </div>
                <div className='songsheadarea' style={{ marginLeft: "55px", marginRight: "55px" }}>
                    <div>
                        <div>
                            #
                            &nbsp;
                            &nbsp;
                            TITLE
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            ALBUM
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            <i class="fa-regular fa-clock"></i>
                        </div>
                    </div>
                    {/* <div style={{ marginRight: "-95px" }}>
                        ALBUM
                    </div>
                    <div style={{ paddingRight: "70px" }}>
                        <i class="fa-regular fa-clock"></i>
                    </div> */}
                </div>

                <div className='nothingliked' style={{ fontSize: "13.5px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <br />
                    <h1>You currently do not have any liked songs.</h1>
                    <br />
                    <h2 style={{ marginTop: "-10px" }}>You should give it a try and start liking some songs!</h2>
                </div>
            </div>
            )
    }
}

export default SongsLiked;
