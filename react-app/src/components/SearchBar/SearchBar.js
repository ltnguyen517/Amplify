import React, {useState, useEffect} from "react";
import { useHistory, useParams, useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actionthunksPlaylist from "../../store/playlist";
import "./SearchBar.css"

export default function SearchBar(){
    const history = useHistory()
    const dispatch = useDispatch()

    const [playlists, setPlaylists] = useState([])
    const [artists, setArtists] = useState([])
    const [songs, setSongs] = useState([])
    const [albums, setAlbums] = useState([])
    const [users, setUsers] = useState([])

    const [searchEntry, setSearchEntry] = useState("")
    const [searchResults, setSearchResults] = useState(false)

    useEffect(() => {
        (async () => {
            const details = await dispatch(actionthunksPlaylist.getAllPlaylists())
            setPlaylists(details)
        })();
        (async () => {
            const artistsResponse = await fetch("/api/artists/")
            const everyArtists = await artistsResponse.json()
            setArtists(everyArtists.artists)
        })();
        (async () => {
            const songsResponse = await fetch("/api/songs")
            const everySong = await songsResponse.json()
            setSongs(everySong.songs)
        })();
        (async () => {
            const albumResponse = await fetch("/api/albums")
            const everyAlbum = await albumResponse.json()
            setAlbums(everyAlbum.albums)
        })();
        (async () => {
            const userResponse = await fetch("/api/users")
            const everyUser = await userResponse.json()
            setUsers(everyUser)
        })();
    }, [searchResults, dispatch, fetch, setPlaylists, setArtists, setSongs, setAlbums, setUsers])

    

    document.body.style = 'background: #1e1e1e';

}
