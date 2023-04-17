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
        
    })

}

export default Albums;
