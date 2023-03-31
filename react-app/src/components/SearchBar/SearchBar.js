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

    const [searchEntry, setSearchEntry] = useState("");
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
            const songsResponse = await fetch("/api/songs/")
            const everySong = await songsResponse.json()
            setSongs(everySong.songs)
        })();
        (async () => {
            const albumResponse = await fetch("/api/albums/")
            const everyAlbum = await albumResponse.json()
            setAlbums(everyAlbum.albums)
        })();
        (async () => {
            const userResponse = await fetch("/api/users/")
            const everyUser = await userResponse.json()
            setUsers(everyUser.users)
        })();
    }, [searchResults, dispatch, fetch, setPlaylists, setArtists, setSongs, setAlbums, setUsers])

    const handleEntry = (e) => {
        setSearchEntry(e.target.value)
        if(e.target.value === ""){
            setSearchResults(false)
        } else {
            setSearchResults(true)
        }
    }

    document.body.style = 'background: #1e1e1e';

    return (
        <div style={{paddingBottom: "80px", marginLeft: "14px", marginTop: "-66px"}}>
            <input
                type="search"
                onChange={handleEntry}
                value={searchEntry}
                placeholder="What do you want to listen to?"
                style={{marginLeft: "4%", marginTop: "25px", paddingLeft: "45px", borderRadius: "26px", height: "37px", position: "sticky", top: "2px", border: "none"}}>
            </input>
            <i id="searchbutton" type="submit" class="fa-solid fa-magnifying-glass"></i>
            <div style={{marginTop: "60px"}}>
                <h1 hidden={searchResults ? false : true} style={{marginLeft: "30px", color: "white", fontSize: "24px"}}>Playlists</h1>
                <div className="resultsofsearch">
                    {playlists.filter(playlist => {
                        if(searchEntry === ""){
                            return playlist;
                        } else if (playlist.title.toLowerCase().includes(searchEntry.toLowerCase())){
                            return playlist;
                        }
                    }).map((playlist, index) => (
                        searchResults === true && (
                            <div onClick={(e) => history.push(`/playlist/${playlist.id}`)} className="playlistboxes" key={index}>
                                <img className="plsearchimg" src={playlist.playlist_picture} />
                                <p style={{fontWeight: "600", marginLeft: "15px"}}>{playlist.title}</p>
                                <span style={{paddingBottom: "18px", marginLeft: "15px", color: "grey", fontSize: "13.5px"}}>By {playlist.User.username}</span>
                            </div>
                        )
                    ))}
                </div>
                <br />
                <h1 hidden={searchResults ? false : true} style={{marginLeft: "30px", color: "white", fontSize: "24px"}}>Artists</h1>
                <div className="resultsofsearch">
                    {artists.filter(artist => {
                        if(searchEntry === ""){
                            return artist
                        } else if (artist.name.toLowerCase().includes(searchEntry.toLowerCase())){
                            return artist
                        }
                    }).map((artist, index) => (
                        searchResults === true && (
                            <div onClick={(e) => history.push(`/artist/${artist.id}`)} className="artistboxes" key={index}>
                                <img className="artistsearchimg" src={artist.artist_photo} />
                                <p style={{fontWeight: "600", marginLeft: "15px"}}>{artist.name}</p>
                                <span style={{paddingBottom: "18px", marginLeft: "15px", color: "grey", fontSize: "13.5px"}}>Artist</span>
                            </div>
                        )
                    ))}
                </div>
                <br />
                <h1 hidden={searchResults ? false : true} style={{marginLeft: "30px", color: "white", fontSize: "24px"}}>Profiles</h1>
                <div className="resultsofsearch">
                    {users?.filter(user => {
                        if(searchEntry === ""){
                            return user
                        } else if (user.username.toLowerCase().includes(searchEntry.toLowerCase())){
                            return user
                        }
                    }).map((user, index) => (
                        searchResults === true && (
                            <div onClick={(e) => history.push(`/user/${user.id}`)} className="artistboxes" key={index}>
                                <img className="artistsearchimg" src={user.profile_picture} />
                                <p style={{fontWeight: "600", marginLeft: "15px"}}>{user.username}</p>
                                <span style={{paddingBottom: "18px", marginLeft: "15px", color: "grey", fontSize: "13.5px"}}>Profile</span>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    )
}
