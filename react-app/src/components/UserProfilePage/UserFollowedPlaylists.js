import React from "react";
import { Link, useHistory } from "react-router-dom";

const UserFollowedPlaylists = ({ userFollowingPlaylists }) => {
    const history = useHistory()

    return (
        <>
            {userFollowingPlaylists && (
                userFollowingPlaylists.map((playlist) => {
                    return <div className="followedplpic" onClick={(e) => history.push(`/playlist/${playlist.id}`)}>
                        <Link to={`/playlist/${playlist.id}`}>
                            <img className="plpic" src={playlist.playlist_picture} />
                        </Link>
                        <p style={{marginLeft: "15px", fontWeight: "700"}}>{playlist.title}</p>
                        <span style={{marginLeft: "15px", paddingBottom: "20px"}}>By {playlist.User.username}</span>
                    </div>
                })
            )}
        </>
    )
}
export default UserFollowedPlaylists
