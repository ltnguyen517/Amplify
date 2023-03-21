import React, { useState, useEffect } from 'react';
import { Link, NavLink, useHistory, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actionthunksPlaylist from "../../store/playlist";


const PlaylistsOfUser = () => {
    const sessionUser = useSelector((state) => state.session.user)
    const playlistState = useSelector((state) => state.playlist)
    const [playlistsOfUser, setPlaylistsOfUser] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actionthunksPlaylist.getAllPlaylists())
    }, [sessionUser?.id, dispatch])

    const playlistArr = Object.values(playlistState)
    const playlistsUser = playlistArr.filter(playlist => playlist?.User?.id === sessionUser.id)

    let playlistContainer
    if (playlistArr && sessionUser) {
        playlistContainer = (
            playlistsUser.map((playlist) => {
                return <Link to={`/playlist/${playlist.id}`}>{playlist.title}</Link>
            }).reverse()
        )
    }
    if (sessionUser) {
        return (
            <div>
                {playlistContainer}
            </div>
        )
    } else {
        return (
            null
        )
    }
}

export default PlaylistsOfUser
