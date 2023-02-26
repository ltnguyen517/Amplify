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
            "title": `Playlist Number ${lengthUserPlaylists}`,
            "description": "Write a description for your new playlist here.",
            "playlist_picture": "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999"
        }
        await dispatch(actionthunksPlaylist.createPlaylist(brandNewPlaylist))
    }
}
