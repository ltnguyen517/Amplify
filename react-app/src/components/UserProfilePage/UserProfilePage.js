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

    profileFollowers?.people_user_follows?.map(async (id) => {
        const response = await fetch(`/api/users/${id}`)
        const data = await response.json()
        userFollowing.push(data)
    })

    if(userId > everyUser?.users?.length) return <Error404Page />

    let userFollowingArr = []
    let userFollowerArr = []

    for (let i = 0; i < everyUser?.users?.length; i++){
        let userId = everyUser.users[i].id
        for (let j = 0; j < profileFollowers?.people_user_follows?.length; j++){
            let anotherUserId = profileFollowers.people_user_follows[j]
            if (userId === anotherUserId){
                userFollowingArr.push(everyUser.users[i])
            }
        }
    }

    for (let i = 0; i < everyUser?.users?.length; i++){
        let userId = everyUser.users[i].id
        for (let j = 0; j < profileFollowers?.followers_of_user?.length; j++){
            let anotherUserId = profileFollowers.followers_of_user[j]
            if(userId === anotherUserId){
                userFollowerArr.push(everyUser.users[i])
            }
        }
    }

    let followerProfileImg

    if(!sessionUserFollowers) return null

    if(!user.profile_picture){
        followerProfileImg = <i class="fa-solid fa-user fa-4x"></i>
    } else {
        followerProfileImg = <img src={sessionUser.profile_picture}/>
    }

    const playlistArray = Object.values(playlistState)
    const userPlaylistsList = playlistArray.filter(playlist => Number(playlist?.User?.id) === Number(userId))

    let lengthUserPlaylists
    if(userPlaylistsList.length === 1){
        lengthUserPlaylists = <span>{userPlaylistsList.length} public playlist</span>
    } else {
        lengthUserPlaylists = <span>{userPlaylistsList.length} public playlists</span>
    }

    let toFollowButton
    if(sessionUser !== null){
        if(userFollowState.includes(user.id)){
            toFollowButton = (<button className="unfollowbutton" hidden={sessionUser.id === user.id} onClick={(e) => { unFollow(e); setEdit(!edit) }}>Unfollow</button>)
        } else {
            toFollowButton = (<button className="followbutton" hidden={sessionUser.id === user.id} onClick={(e) => { follow(e); setEdit(!edit) }}>Follow</button>)
        }
    } else {
        toFollowButton = (<button className="followbutton" onClick={() => history.push("/login")}>Follow</button>)
    }

    const unFollow = (e) => {
        setEdit(true)
        e.preventDefault()
        dispatch(followingUserStore.unfollowAUser(sessionUser.id, userId))
    }

    const follow = (e) => {
        setEdit(true)
        e.preventDefault()
        dispatch(followingUserStore.followAUser(sessionUser.id, userId))
    }

    if(sessionUser){
        if(sessionUser.id === Number(userId)){
            return (
                <div className="userprofmain">
                    <div className="userprofheader" style={{display: "flex", flexDirection: "row"}}>
                        <div className="userprofpicture">
                            {followerProfileImg}
                        </div>
                        <div className="userdata">
                            Profile
                            <h1 style={{color: "white"}}>
                                {sessionUser.username}
                            </h1>
                            {lengthUserPlaylists}

                            <span style={{fontSize: "20px"}}>·</span>

                            {sessionUserFollowing?.followers_of_user?.length} Followers

                            <span style={{fontSize: "20px"}}>·</span>

                            {sessionUserFollowing?.people_user_follows?.length} Following
                        </div>
                    </div>
                    <div className="followpersonarea">
                        {toFollowButton}
                    </div>
                    <div className="userprofdetails">
                        <h2 style={{ color: "white" }}>Playlists</h2>
                        <div className="userprofplaylists">
                            <UserOwnPlaylists userPlaylistsList={userPlaylistsList} />
                        </div>
                        <h2 style={{ color: "white" }}>Followed Playlists</h2>
                        <div className="followedplaylistscontainer">
                            <UserFollowedPlaylists followingPlaylists={followingPlaylists} />
                        </div>
                    </div>
                    <h2 style={{ color: "white" }}>Following</h2>
                    <div className="usersfollowed-container" style={{ display: "flex", flexDirection: "row" }}>
                        <UserFollowing userFollowingArr={userFollowingArr} followerProfileImg={followerProfileImg} />
                    </div>
                    <h2 style={{ color: "white" }}>Followers</h2>
                    <div className="usersfollowed-container" style={{ display: "flex", flexDirection: "row" }}>
                        <UserFollowers userFollowerArr={userFollowerArr} followerProfileImg={followerProfileImg} />
                    </div>
                </div>
            )
        } else {
            return (
                <div className="userprofmain">
                    <div className="userprofheader" style={{ display: "flex", flexDirection: "row" }}>
                        <div className="userprofpicture">
                            {followerProfileImg}
                        </div>
                        <div className="userdata">
                            Profile
                            <h1 className="name" style={{ color: "white" }}>
                                {user.username}
                            </h1>
                            {lengthUserPlaylists}

                            <span style={{ fontSize: "20px" }}>·</span>

                            {profileFollowers?.followers_of_user?.length} Followers

                            <span style={{ fontSize: "20px" }}>·</span>

                            {profileFollowers?.people_user_follows?.length} Following
                        </div>
                    </div>
                    <div className="followpersonarea">
                        {toFollowButton}
                    </div>
                    <div className="userprofdetails">
                        <h2 style={{ color: "white" }}>Playlists</h2>
                        <div className="userprofplaylists">
                            <UserOwnPlaylists userPlaylistsList={userPlaylistsList} />
                        </div>
                        <h2 style={{ color: "white" }}>Followed Playlists</h2>
                        <div className="followedplaylistscontainer">
                            <UserFollowedPlaylists followingPlaylists={followingPlaylists} />
                        </div>
                        <h2 style={{ color: "white" }}>Following</h2>
                        <div className="usersfollowed-container">
                            <UserFollowing userFollowingArr={userFollowingArr} followerProfileImg={followerProfileImg} />
                        </div>
                        <h2 style={{ color: "white" }}>Followers</h2>
                        <div className="usersfollowed-container">
                            <UserFollowers userFollowerArr={userFollowerArr} followerProfileImg={followerProfileImg} />
                        </div>
                    </div>
                </div>
            )
        }
    } else {
        return (
            <div className="userprofmain">
                <div className="userprofheader" style={{ display: "flex", flexDirection: "row" }}>
                    <div className="userprofpicture">
                        {followerProfileImg}
                    </div>
                    <div className="userdata">
                        Profile
                        <h1 className="name" style={{ color: "white" }}>
                            {user.username}
                        </h1>
                        {lengthUserPlaylists}

                        <span style={{ fontSize: "20px" }}>·</span>

                        {profileFollowers?.followers_of_user?.length} Followers

                        <span style={{ fontSize: "20px" }}>·</span>

                        {profileFollowers?.people_user_follows?.length} Following
                    </div>
                </div>
                <div className="followpersonarea">
                    {toFollowButton}
                </div>
                <div className="userprofdetails">
                    <h2 style={{ color: "white" }}>Playlists</h2>
                    <div className="userprofplaylists">
                        <UserOwnPlaylists userPlaylistsList={userPlaylistsList} />
                    </div>
                    <h2 style={{ color: "white" }}>Followed Playlists</h2>
                    <div className="followedplaylistscontainer">
                        <UserFollowedPlaylists followingPlaylists={followingPlaylists} />
                    </div>
                    <h2 style={{ color: "white" }}>Following</h2>
                    <div className="usersfollowed-container">
                        <UserFollowing userFollowingArr={userFollowingArr} followerProfileImg={followerProfileImg} />
                    </div>
                    <h2 style={{ color: "white" }}>Followers</h2>
                    <div className="usersfollowed-container">
                        <UserFollowers userFollowerArr={userFollowerArr} followerProfileImg={followerProfileImg} />
                    </div>
                </div>
            </div>
        )
    }
};

export default UserProfilePage;
