import React, {useState} from "react";
import {Modal} from "../../context/Modal";
import { Link } from "react-router-dom";
import UpdatePlaylist from "./UpdatePlaylist";

const UpdatePlaylistModal = ({ playlistId, playlist, aPlaylist }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div onClick={() => setShowModal(true)}>
            {/* <button onClick={() => setShowModal(true)}>Edit Playlist</button> */}
                <div className='plheader' style={{ backgroundImage: playlist ? `url(${playlist.playlist_picture})` : null, backgroundSize: playlist ? "0.5px 0.5px" : null, width: "109%", paddingBottom: "30px" }}>

                    <div style={{ width: "250px", height: "250px", paddingLeft: "30px", cursor: "pointer" }} className="plpicturearea">
                        <img className="plimg" src={playlist?.playlist_picture} />
                    </div>

                    <div id='plinfoarea' style={{ paddingLeft: "30px", marginTop: "50px" }}>
                        <div id='pltext' style={{ fontSize: "12px" }}>
                            PLAYLIST
                        </div>
                        <div className="pltitlearea" style={{ cursor: "pointer", fontSize: "70px", fontWeight: "700", textDecoration: "none" }}>
                            {playlist?.title}
                        </div>
                        <div className="pldescriptionarea">
                            {playlist?.description}
                        </div>
                        <div>
                            <Link style={{ textDecoration: "none", color: "white" }} to={`/user/${aPlaylist?.User?.id}`}>
                                {aPlaylist?.User?.username}
                            </Link>
                            <span style={{ fontSize: "20px" }}>·</span>
                            {aPlaylist?.Songs && (
                                <span>{aPlaylist?.Songs?.length} songs</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <UpdatePlaylist setShowModal={setShowModal} playlistId={playlistId} onClick={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    )
}

export default UpdatePlaylistModal
