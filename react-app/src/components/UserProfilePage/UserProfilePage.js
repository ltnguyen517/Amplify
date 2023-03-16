import React, { useEffect, useState } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as followingUserStore from "../../store/followinguser";
import Error404Page from "../ErrorPage/ErrorPage";
import UserOwnPlaylists from "./UserOwnPlaylists";
import UserFollowedPlaylists from "./UserFollowedPlaylists";
import UserFollowers from "./UserFollowers";
import UserFollowing from "./UserFollowing";
import "./UserProfilePage.css"

const UserProfilePage = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user)
    const playlistState = useSelector((state) => state.playlist)
    const userFollowState = useSelector((state) => state.follows.people_user_follows)

    const [user, setUser] = useState([])
    const [everyUser, setEveryUser] = useState([])
    const [sessionUserFollowers, setSessionUserFollowers] = useState([])
    const [profileFollowers, setProfileFollowers] = useState([])
    const [sessionUserFollowing, setSessionUserFollowing] = useState([])
    const [followingPlaylists, setFollowingPlaylists] = useState([])
    const [edit, setEdit] = useState(true)
    let { userId } = useParams()

    const userFollowing = []

    useEffect(() => {
        (async () => {
            const userResponse = await fetch(`/api/users/${userId}`)
            const user = await userResponse.json()
            setUser(user)
        })();
        (async () => {
            const everyUserResponse = await fetch("/api/users/")
            const everyUser = await everyUserResponse.json()
            setEveryUser(everyUser)
        })();
        (async () => {
            if (sessionUser) {
                const userFollowersArr = []
                await dispatch(followingUserStore.getAllUserFollowers(sessionUser.id))
            }
        })();
        (async () => {
            const followInfo = await dispatch(followingUserStore.getAllUserFollowers(userId))
            setProfileFollowers(followInfo)
        })();
        (async () => {
            const playlistFollowResponse = await fetch(`/api/users/${userId}/playlists-followed`)
            const playlistFollowInfo = await playlistFollowResponse.json()
            setFollowingPlaylists(playlistFollowInfo.following)
        })();
        (async () => {
            if(sessionUser){
                const data = await dispatch(followingUserStore.getAllUserFollowers(sessionUser?.id))
                setSessionUserFollowing(data)
            }
        })();
    }, [userId, sessionUser?.id, setSessionUserFollowing, setUser, dispatch, setSessionUserFollowers, setProfileFollowers, edit, setFollowingPlaylists])

    profileFollowers?.
};

export default UserProfilePage;
