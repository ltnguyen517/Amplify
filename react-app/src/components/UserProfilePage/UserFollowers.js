import React from "react";
import { Link, useHistory } from "react-router-dom";

const UserFollowers = ({ allUserFollowers, followerProfileImg }) => {
    const history = useHistory()

    return (
        <>
            {allUserFollowers?.map((follower) => {
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
