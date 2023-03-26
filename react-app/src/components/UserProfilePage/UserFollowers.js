import React from "react";
import { Link, useHistory } from "react-router-dom";

const UserFollowers = ({ userFollowerArr, followerProfileImg }) => {
    const history = useHistory()

    return (
        <>
            {userFollowerArr?.map((follower) => {
                return <div className="followerbox" onClick={(e) => history.push(`/user/${follower.id}`)}>
                    <div className="followerpic">
                        {followerProfileImg}
                    </div>
                    <span>{follower.username}</span>
                    <div>
                        Profile
                    </div>
                </div>
            })}
        </>
    )
}
export default UserFollowers;
