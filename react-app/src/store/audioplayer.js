const ADD_SONG = "audioplayer/addSong"
const NEXT_SONG = "audioplayer/nextSong"
const ADD_PLAYLIST = "audioplayer/addPlaylist"
const SKIP_SONG = "audioplayer/skipSong"
const ADD_ALBUM = "audioplayer/addAlbum"
const ADD_SONGS_LIKED = "audioplayer/addLikes"

const addSongAction = (song) => ({
    type: ADD_SONG,
    song
})

const nextSongAction = (song) => ({
    type: NEXT_SONG,
    song
})

const addPlaylistAction = (playlist) => ({
    type: ADD_PLAYLIST,
    playlist
})

const skipSongAction = () => ({
    type: SKIP_SONG
})

const addAlbumAction = (album) => ({
    type: ADD_ALBUM,
    album
})

const addSongsLikedAction = (likes) => ({
    type: ADD_SONGS_LIKED,
    likes
})


export const addSong = (id) => async (dispatch) => {
    const response = await fetch(`/api/songs/${id}`)
    if (response.ok) {
        const data = await response.json()
        dispatch(addSongAction(data))
        return data
    }
    return response
}

export const nextSong = (id) => async (dispatch) => {
    const response = await fetch(`/api/songs/${id}`)
    if (response.ok) {
        const data = await response.json()
        dispatch(nextSongAction(data))
        return data
    }
    return response
}

export const addPlaylist = (id) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${id}`)
    if (response.ok) {
        const data = await response.json()
        dispatch(addPlaylistAction(data))
        return data
    }
    return response
}

export const skipSong = () => async (dispatch) => {
    dispatch(skipSongAction())
}

export const addAlbum = (id) => async (dispatch) => {
    const response = await fetch(`/api/albums/${id}/`)
    if (response.ok) {
        const data = await response.json()
        dispatch(addAlbumAction(data))
        return data
    }
    return response
}

export const addLikes = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/likesof_song`)
    if (response.ok){
        const data = await response.json()
        dispatch(addSongsLikedAction(data.SongsLiked))
        return data.SongsLiked
    }
    return response
}

const initalState = { current_song: [], queue: [] }

export default function audioPlayerReducer(state = initalState, action) {
    switch (action.type) {
        case ADD_SONG:
            return { ...state, current_song: [action.song] }
        case NEXT_SONG:
            if (state.current_song.length === 0) {
                return { ...state, current_song: [action.song] }
            } else if (!!state.queue) {
                return { ...state, queue: [...state.queue, action.song] }
            } else {
                return { ...state, queue: [action.song] }
            }
        case ADD_PLAYLIST:
            return { ...state, current_song: [action.playlist.Songs[0]], queue: [...action.playlist.Songs.slice(1)] }
        case SKIP_SONG:
            if (state.queue.length === 0) {
                return { ...state, current_song: [], queue: [] }
            } else {
                return { current_song: [state.queue[0]], queue: [...state.queue.slice(1)] }
            }
        case ADD_ALBUM:
            return { ...state, current_song: [action.album.Songs[0]], queue: [...action.album.Songs.slice(1)] }
        case ADD_SONGS_LIKED:
            return { ...state, current_song: [action.likes[0]], queue: [...action.likes.slice(1)]}
        default:
            return state
    }
}
