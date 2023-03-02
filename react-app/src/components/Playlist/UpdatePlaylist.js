import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, {useEffect, useState} from "react";
import * as actionthunksPlaylist from "../../store/playlist";
import "./UpdatePlaylist.css"

const UpdatePlaylist = ({playlistId, setShowModal}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user)

    const editingPlaylist = useSelector((state) => state.playlist)
    const editingArr = Object.values(editingPlaylist)
    const playlistOfUser = editingArr.filter(playlist => Number(playlist.id) === Number(playlistId))

    const [picture, setPicture] = useState("")
    const [errors, setErrors] = useState([])
    const [title, setTitle] = useState(playlistOfUser[0].title)
    const [description, setDescription] = useState(playlistOfUser[0].description)

    const formData = new FormData()

    useEffect(async () => {
        await dispatch(actionthunksPlaylist.getAPlaylist(playlistId))
        await dispatch(actionthunksPlaylist.getAllPlaylists())
    }, [dispatch])

    useEffect(() => {
        const errArr = []
        if(title.length <= 3 || title.length > 60) errArr.push("Playlist title needs to be between 4 to 60 characters long!")
        setErrors(errArr)
    }, [title.length])

    if(!sessionUser) return null
    if(!playlistId) return null

    let rightOne = true

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(errors.length) return
        setErrors([])
        setPicture("")
        const errArr = []
        if(description.length <= 5 || description.length > 255) errArr.push("Description needs to be between 6 to 255 characters long!")

        let picUpload = document.querySelector("#file-input")
        setErrors(errArr)

        for (let i = 0; i < picUpload.files.length; i++) {
            let pic = picUpload.files[i]
            if (pic.type !== "image/gif" && pic.type !== "image/jpeg" && pic.type !== "image/png") {
                rightOne = false
            }
            formData.append('file', pic)
        }
        if(rightOne === false) errArr.push("Unable to upload. Acceptable files are .GIF, .JPEG/JPG, and .PNG files")
        setErrors(errArr)

        if(errArr.length) return

        let pic = picUpload.files[0]
        formData.append('file', pic)

        if (pic === undefined && !description) {
            const playlisttoUpdate = {
                title,
                description: " ",
                playlist_picture: ""
            }

            const updatedPlaylist = await dispatch(actionthunksPlaylist.editPlaylist(playlisttoUpdate, playlistId))

            if (updatedPlaylist) {
                await dispatch(actionthunksPlaylist.getAPlaylist(playlistId))
                await dispatch(actionthunksPlaylist.getAllPlaylists())
                await setShowModal(false)
            }
        } else if (pic === undefined && description) {
            const playlisttoUpdate = {
                title,
                description,
                playlist_picture: ""
            }
            const updatedPlaylist = await dispatch(actionthunksPlaylist.editPlaylist(playlisttoUpdate, playlistId))

            if (updatedPlaylist) {
                await dispatch(actionthunksPlaylist.getAPlaylist(playlistId))
                await dispatch(actionthunksPlaylist.getAllPlaylists())
                await setShowModal(false)
            }
        } else if (pic !== undefined && !description) {
            const pic = await fetch("/api/playlists/pictures/upload", {
                method: "POST",
                body: formData
            })

            const picURL = await pic.json()
            const playlisttoUpdate = {
                title,
                description: " ",
                playlist_picture: picURL.picture
            }

            const updatedPlaylist = await dispatch(actionthunksPlaylist.editPlaylist(playlisttoUpdate, playlistId))
            if (updatedPlaylist) {
                await dispatch(actionthunksPlaylist.getAPlaylist(playlistId))
                await dispatch(actionthunksPlaylist.getAllPlaylists())
                await setShowModal(false)
            }
        } else {
            const pic = await fetch("/api/playlists/pictures/upload", {
                method: "POST",
                body: formData
            })
            const picURL = await pic.json()
            const playlisttoUpdate = {
                title,
                description,
                playlist_picture: picURL.picture
            }
            const updatedPlaylist = await dispatch(actionthunksPlaylist.editPlaylist(playlisttoUpdate, playlistId))
            if (updatedPlaylist) {
                await dispatch(actionthunksPlaylist.getAPlaylist(playlistId))
                await dispatch(actionthunksPlaylist.getAllPlaylists())
                await setShowModal(false)
            }
        }
    }
    return (
        <div className='editplarea'>
            <form className='editplform' onSubmit={handleSubmit}>
                <h3>Editing information</h3>
                <div>
                    {errors.map((error) => {
                        return <span>{error}</span>
                    })}
                </div>

                <div className='editplinput'>

                    <div style={{ width: "200px", height: "200px" }} className='editpicarea'>
                        <label htmlFor='file-input'>
                            <img style={{ width: "200px", height: "210px" }} src={playlistOfUser[0].playlist_picture} />
                        </label>
                        <input className="file-input" type='file' name='file' encType="multipart/form-data" />
                    </div>

                    <div className='titledescarea'>
                        <label>Title</label>
                        <input className="titlearea" name='title' type='text' value={title} onChange={(e) => setTitle(e.target.value)} />

                        <label>Description</label>
                        <textarea placeholder='Add a description' className="descriptionwrite" name='description' type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                </div>

                <div className="submiteditbutton">
                    <button style={{ cursor: "pointer" }} className='editsubbutt' type='submit'>Save</button>
                </div>
            </form>

            <div style={{ fontSize: "11.5px", marginTop: "10px", marginLeft: "10px" }}>
                By proceeding, you agree to give Amplify access to the image you choose to upload. Please make sure you have the right to upload the image.
            </div>
        </div>
    )
}
export default UpdatePlaylist
