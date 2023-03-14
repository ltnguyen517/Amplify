const GET_SONGLIKES = "/songs/getSongLikes"
const LIKE_ASONG = "/songs/likeASong"
const UNLIKE_ASONG = "/songs/unlikeASong"

const getLikes = (likes) => ({
    type: GET_SONGLIKES,
    likes
});

const likeSong = (song) => ({
    type: LIKE_ASONG,
    song
});

const unlikeSong = (songId) => ({
    type: UNLIKE_ASONG,
    songId
});

export const getAllLikes = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/likesof_song`)
    if (response.ok){
        const data = await response.json()
        dispatch(getLikes(data.SongsLiked))
        return data
    }
    return response
}

export const userLikeSong = (userId, songId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/like-unlikesong/${songId}`, {
        method: "POST"
    })
    if (response.ok){
        const data = await response.json()
        dispatch(likeSong(data.SongsLiked))
        return data
    }
    return response
}

export const userUnlikeSong = (userId, songId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/like-unlikesong/${songId}`, {
        method: "DELETE"
    })
    if (response.ok){
        const data = await response.json()
        dispatch(unlikeSong(data.SongsLiked))
        return data
    }
    return response
}

const initialState = {}

export default function songsLikedReducer(state = initialState, action){
    switch (action.type){
        case GET_SONGLIKES: {
            let newState = { ...state }
            action.likes.forEach((like) => {
                newState[like.id] = like
            })
            return newState
        }
        case LIKE_ASONG: {
            let newState = { ...state }
            newState[action.song[0].id] = action.song
            return newState
        }
        case UNLIKE_ASONG: {
            let newState = { ...state }
            delete newState[action.songId]
            return newState
        }
        default:
            return state
    }
}
