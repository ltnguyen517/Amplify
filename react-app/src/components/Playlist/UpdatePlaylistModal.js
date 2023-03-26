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
                <div className='plheader' style={{ backgroundImage: playlist ? `url(${playlist.playlist_picture})` : null, backgroundSize: playlist ? "0.5px 0.5px" : null, width: "497%",  paddingBottom: "30px", marginLeft: "-35px"}}>

                    <div style={{ width: "250px", height: "250px", paddingLeft: "30px", cursor: "pointer" }}>
                        <img className="plpic" src={playlist?.playlist_picture} />
                    </div>

                    <div id="plinfoarea" style={{ paddingLeft: "30px", marginTop: "25px" }}>
                        <div className='pltext' style={{ fontSize: "12px" }}>
                            PLAYLIST
                        </div>
                        <div className="pltitle" style={{ cursor: "pointer", fontSize: "68px", fontWeight: "700", textDecoration: "none" }}>
                            {playlist?.title}
                        </div>
                        <div className="pldescription" style={{marginTop: "6px"}}>

                            {playlist?.description}
                        </div>
                        <div style={{marginTop: "9px"}}>
                            <Link style={{ textDecoration: "none", color: "white", fontSize: "14px" }} to={`/user/${aPlaylist?.User?.id}`}>
                                {aPlaylist?.User?.username}
                            </Link>
                            &nbsp;
                            <span style={{ fontSize: "14px" }}>·</span>
                            &nbsp;
                            {aPlaylist?.Songs && (
                                <span style={{fontSize: "14px"}}>{aPlaylist?.Songs?.length} songs</span>
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
