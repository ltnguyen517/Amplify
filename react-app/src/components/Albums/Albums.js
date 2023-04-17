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
    const [activeMenu, setActiveMenu] = useState()
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

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    if(albumId <= 0 || albumId > 6){
        return (
            <Error404Page />
        )
    }

    if (location.pathname.includes("album") && nav) {
        nav.style.backgroundImage = `url(${album.album_photo})`
        nav.style.backgroundSize = "0.5px 0.5px"
    }

    let userPlaylists
    let lengthUserPlaylists
    let songsLikedArr = Object.values(songsLiked)

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
        </>
    )


}

export default Albums;
