import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, useHistory, useLocation, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import * as actionthunksPlaylist from "../../store/playlist";
import "./PlaylistPage.css"

export default function PlaylistPage(){
    const history = useHistory()
    const dispatch = useDispatch()
    const { playlistId } = useParams()
    const location = useLocation()

    const [aPlaylist, setAPlaylist] = useState([])
    const [showMenu, setShowMenu] = useState(false)
    const [activeMenu, setActiveMenu] = useState()
    const [canSee, setCanSee] = useState(false)
    const [edit, setEdit] = useState(true)
    const [playlistsFollowing, setPlaylistsFollowing] = useState([])
    const playlistState = useSelector((state) => state.playlist)
    const sessionUser = useSelector((state) => state.session.user)

    let i = 0

    useEffect(async () => {
        if(!playlistState) return null

        setAPlaylist(await dispatch(actionthunksPlaylist.getAPlaylist(playlistId)))
        await dispatch(actionthunksPlaylist.getAllPlaylists())
    }, [dispatch, playlistId, edit, setEdit, setAPlaylist, sessionUser?.id])

    const playlistArr = Object.values(playlistState)
    const playlist = playlistArr.filter(playlist => Number(playlist.id) === Number(playlistId))[0]

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

    return (
        <>
            {aPlaylist.User && (
                <div className="playlistarea" style={{color:"white"}}>
                    {sessionUser?.id !== aPlaylist?.User?.id && (
                        <div className="plheader" style={{backgroundImage: `url(${playlist.playlist_picture})`, backgroundSize: "0.5px 0.5px", width: "109%", paddingBottom: "40px"}}>
                            <div className="plpicarea" style={{paddingLeft: "30px"}}>
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
                                Title
                            </div>
                        </div>
                        <div>
                            &nbsp;
                            &nbsp;
                            Album
                        </div>
                        <div style={{paddingRight: "20px"}}>
                            <i class="fa-light fa-clock"></i>
                        </div>
                    </div>
                    {aPlaylist.Songs && (
                        <div>
                            <div>
                                <div>
                                    <div></div>
                                    <div>
                                        <span></span>
                                        {/* <button style={{background: "none"}} className="dropdown-songs" onClick={(e) => activeMenu === song.id ? setActiveMenu(null) : setActiveMenu(song.id)}>...</button> */}
                                        {/* {activeMenu === song.id && (
                                            <div>
                                                <div>

                                                </div>
                                                <div>
                                                    {showMenu && (
                                                        <div>
                                                            <button className="createplbutton" onClick={createPlaylist}>Create Playlist</button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )} */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}
