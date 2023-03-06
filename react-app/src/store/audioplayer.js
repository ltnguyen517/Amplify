const ADD_SONG = "audioplayer/addSong"
const NEXT_SONG = "audioplayer/nextSong"
const ADD_PLAYLIST = "audioplayer/addPlaylist"
const SKIP_SONG = "audioplayer/skipSong"


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
        default:
            return state
    }
}
