import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link, useHistory, useParams } from 'react-router-dom';
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

    const playlistArr = Object.values(playlistState)
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

    
}

export default SongsLiked;
