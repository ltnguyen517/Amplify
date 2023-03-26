import React from "react";
import { Link, useHistory } from "react-router-dom";

const UserFollowedPlaylists = ({ followingPlaylists }) => {
    const history = useHistory()

    return (
        <>
            {followingPlaylists && (
                followingPlaylists.map((playlist) => {
                    return <div className="followedplpic" onClick={(e) => history.push(`/playlist/${playlist.id}`)}>
                        <Link to={`/playlist/${playlist.id}`}>
                            <img className="plpic" src={playlist.playlist_picture} />
                        </Link>
                        <p style={{marginLeft: "1px", fontWeight: "700", color: "white"}}>{playlist.title}</p>
                        <span style={{marginLeft: "1px", paddingBottom: "20px", color: "gray"}}>By {playlist.User.username}</span>
                    </div>
                })
            )}
        </>
    )
}
export default UserFollowedPlaylists
