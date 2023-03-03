const GET_PLAYLISTS_FOLLOWED = "/playlists/getPlaylistsFollowed"
const CREATE_PLAYLIST_FOLLOW = "playlists/createPlaylistFollow"
const DELETE_PLAYLIST_FOLLOW = "playlists/deletePlaylistFollow"

const getPlFollowed = (playlists) => ({
    type: GET_PLAYLISTS_FOLLOWED,
    playlists
})

const createPlFollow = (playlist) => ({
    type: CREATE_PLAYLIST_FOLLOW,
    playlist
})

const deletePlFollow = (playlistId) => ({
    type: DELETE_PLAYLIST_FOLLOW,
    playlistId
})

export const getAllPlFollowed = (id) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}/playlists-followed`)
    if(response.ok){
        const data = await response.json()
        dispatch(getPlFollowed(data.followingPlaylist))
        return data
    }
    return response
}

export const followPlaylist = (userId, playlistId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/playlist-follow/${playlistId}`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        }
    })
    if(response.ok){
        const data = await response.json()
        dispatch(createPlFollow(data.followingPlaylist))
        return data
    }
    return response
}

export const unfollowPlaylist = (userId, playlistId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/playlist-follow/${playlistId}`, {
        method: "DELETE"
    })
    if(response.ok){
        const data = await response.json()
        dispatch(deletePlFollow(playlistId))
        return data
    }
    return response
}

const initialState = {}

export default function followingPlaylistReducer(state = initialState, action){
    switch (action.type) {
        case GET_PLAYLISTS_FOLLOWED: {
            let newState = {...state}
            action.playlists.forEach((playlist) => {
                newState[playlist.id] = playlist
            })
            return newState
        }
        case CREATE_PLAYLIST_FOLLOW: {
            let newState = { ...state }
            newState[action.playlist[0].id] = action.playlist
            return newState
        }
        case DELETE_PLAYLIST_FOLLOW: {
            let newState = {...state}
            delete newState[action.playlistId]
            return newState
        }
        default:
            return state
    }
}

// const GET_PLAYLIST_FOLLOWERS = "followingPlaylist/getPlaylistFollowers"
// const CREATE_PLAYLIST_FOLLOW = "followingPlaylist/createPlaylistFollow"
// const DELETE_PLAYLIST_FOLLOW = "followingPlaylist/deletePlaylistFollow"

// const getPlFollowers = (followers) => ({
//     type: GET_PLAYLIST_FOLLOWERS,
//     followers
// })

// const createPlFollow = (user) => ({
//     type: CREATE_PLAYLIST_FOLLOW,
//     user
// })

// const deletePlFollow = (user) => ({
//     type: DELETE_PLAYLIST_FOLLOW,
//     user
// })

// export const getPlaylistAllFollowers = (playlistId) => async (dispatch) => {
//     const response = await fetch(`/api/playlists/${playlistId}/playlist-followers`)
//     if(response.ok){
//         const data = await response.json()
//         dispatch(getPlFollowers(data))
//         return data
//     } else {
//         return response
//     }
// }

// export const followPlaylist = (userId, playlistId) => async (dispatch) => {
//     const response = await fetch(`/api/users/${userId}/playlist-follow/${playlistId}`, {
//         method: "POST",
//         headers: {
//             'Content-Type': "application/json"
//         }
//     })
//     if(response.ok){
//         const data = await response.json()
//         dispatch(createPlFollow(playlistId))
//         return data
//     } else {
//         return response
//     }
// }

// export const unfollowPlaylist = (userId, playlistId) => async (dispatch) => {
//     const response = await fetch(`/api/users/${userId}/playlist-follow/${playlistId}`, {
//         method: "DELETE"
//     })
//     if(response.ok){
//         const data = await response.json()
//         dispatch(deletePlFollow(playlistId))
//         return data
//     } else {
//         return response
//     }
// }

// const initialState = {"playlists_user_follows": [], "followers_of_playlist": []}

// const followingPlaylistReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case GET_PLAYLIST_FOLLOWERS:
//             return {...state, ...action.followers}
//         case CREATE_PLAYLIST_FOLLOW:
//             return {...state, playlists_user_follows: [...state.playlists_user_follows, action.user]}
//         case DELETE_PLAYLIST_FOLLOW:
//             return {...state, playlists_user_follows: state.playlists_user_follows.filter((e) => e !== action.user)}
//         default:
//             return state
//     }
// }

// export default followingPlaylistReducer
