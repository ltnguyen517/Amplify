import React from "react";
import { Link, useHistory } from "react-router-dom";

const UserFollowing = ({ userFollowingArr, followerProfileImg }) => {
    const history = useHistory()

    return (
        <>
            {userFollowingArr?.map((follower) => {
                return <div className="followerbox" onClick={(e) => history.push(`/user/${follower.id}`)}>
                    <div className="followerpic">
                        {followerProfileImg}
                    </div>
                    {follower.username}
                    <div>
                        Profile
                    </div>
                </div>
            })}
        </>
    )
}
export default UserFollowing;
