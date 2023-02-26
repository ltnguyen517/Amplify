const GET_ALL_PLAYLISTS = '/playlists/getAllPlaylists';
const GET_A_PLAYLIST = '/playlists/getAPlaylist';
const GET_PLAYLISTS_FOLLOWED = '/playlists/getPlaylistsFollowed';
const CREATE_PLAYLIST =  '/playlists/createPlaylist';
const EDIT_PLAYLIST = '/playlists/editPlaylist';
const DELETE_PLAYLIST = '/playlists/deletePlaylist';

const getPlaylists = (playlists) => ({
    type: GET_ALL_PLAYLISTS,
    playlists
});

const getOnePlaylist = (playlist) => ({
    type: GET_A_PLAYLIST,
    playlist
});

const getFollowedPlaylists = (playlists) => ({
    type: GET_PLAYLISTS_FOLLOWED,
    playlists
});

const createAPlaylist = (playlist) => ({
    type: CREATE_PLAYLIST,
    playlist
});

const editAPlaylist = (playlist) => ({
    type: EDIT_PLAYLIST,
    playlist
});

const deleteAPlaylist = (id) => ({
    type: DELETE_PLAYLIST,
    id
});

// Thunk

export const getAllPlaylists = () => async (dispatch) => {
    const response = await fetch("/api/playlists/")
    if (response.ok){
        const data = await response.json()
        dispatch(getPlaylists(data.Playlists))
        return data.Playlists
    } else {
        return response
    }
};

export const getAPlaylist = (id) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${id}`)
    if (response.ok){
        const data = await response.json()
        dispatch(getOnePlaylist(data))
        return data
    } else {
        return response
    }
};

export const getPlaylistsFollowed = (id) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}/playlists-followed`)
    if (response.ok){
        const data = await response.json()
        dispatch(getFollowedPlaylists(data))
        return data
    } else {
        return response
    }
};

export const createPlaylist = (playlist) => async (dispatch) => {
    const response = await fetch("/api/playlists/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(playlist)
    })
    if (response.ok){
        const data = await response.json()
        dispatch(createAPlaylist(data))
        return data
    } else {
        return response
    }
};

export const editPlaylist = (playlist, id) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(playlist)
    })
    if (response.ok){
        const data = await response.json()
        dispatch(editAPlaylist(data))
        return data
    } else {
        return response
    }
};

export const deletePlaylist = (id) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${id}`, {
        method: "DELETE"
    })
    if (response.ok){
        const data = await response.json()
        dispatch(deleteAPlaylist(id))
        return data
    } else {
        return response
    }
};

const initialState = {}


