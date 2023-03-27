const GET_FOLLOWERS = "followinguser/getFollowers"
const CREATE_FOLLOW = "followinguser/createFollow"
const DELETE_FOLLOW = "followinguser/deleteFollow"

const actionGetFollowers = (followers) => ({
    type: GET_FOLLOWERS,
    followers
})

const actionCreateFollow = (user) => ({
    type: CREATE_FOLLOW,
    user
})

const actionDeleteFollow = (user) => ({
    type: DELETE_FOLLOW,
    user
})

export const getAllUserFollowers = (id) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}/followingcompilation`)

    if(response.ok){
        const data = await response.json()
        dispatch(actionGetFollowers(data))
        return data
    } else {
        return response
    }
}

export const followAUser = (id, id2) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}/follow/${id2}`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        }
    })
    if(response.ok){
        const data = await response.json()
        dispatch(actionCreateFollow(id2))
        return data
    } else {
        return response
    }
}

export const unfollowAUser = (id, id2) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}/follow/${id2}`, {
        method: "DELETE"
    })
    if(response.ok){
        const data = await response.json()
        dispatch(actionDeleteFollow(id2))
        return data
    } else {
        return await response.json()
    }
}

const initialState = {"people_user_follows": [],
"followers_of_user": []
}

const followingUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FOLLOWERS:
            return {...state, ...action.followers}
        case CREATE_FOLLOW:
            return {...state, people_user_follows: [...state.people_user_follows, action.user]}
        case DELETE_FOLLOW:
            return {...state, people_user_follows: state.people_user_follows.filter((e) => e !== action.user)}
        default:
            return state
    }
}

export default followingUserReducer
