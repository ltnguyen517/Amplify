import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import ProfileDropDown from '../ProfileDropDown/ProfileDropDown';
import PlaylistsOfUser from '../PlaylistsOfUser/PlaylistsOfUser';
import { useDispatch, useSelector } from 'react-redux';
import * as playlistActionThunks from "../../store/playlist"
import * as audioplayerActions from "../../store/audioplayer"
import * as followingPlaylistActions from "../../store/followingplaylist"
import "./Audioplayer.css"

const AudioPlayerComponent = () => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [current_track, setCurrentTrack] = useState(0);
    const [trackProgress, setTrackProgress] = useState()
    const [volume, setVolume] = useState(0.2)
    const [update, setUpdate] = useState(false)
    const dispatch = useDispatch()
    const audioState = useSelector((state) => state.audioplayer)
    const audioRef = useRef(new Audio(audioState?.current_song[0]?.song_url));
    const intervalRef = useRef();
    const isReady = useRef(false);
    const { duration } = audioRef.current;

    useEffect(() => {
        if (isPlaying) {
            isReady.current = true
            audioRef.current.play();
            audioRef.current.volume = volume
            startTimer()
        } else {
            clearInterval(intervalRef.current);
            audioRef.current.pause();
        }
    }, [isPlaying, update, setUpdate]);

    useEffect(() => {
        return () => {
            audioRef.current.pause();
            audioRef.current.volume = volume
            clearInterval(intervalRef.current);
        }
    }, []);

    useEffect(() => {
        audioRef.current.pause()
        audioRef.current = new Audio(audioState?.current_song[0]?.song_url)
        setTrackProgress(audioRef.current.currentTime)
        audioRef.current.volume = volume
        if (isReady.current) {
            audioRef.current.play()
            setIsPlaying(true)
            audioRef.current.volume = volume
            startTimer()
        } else {
            isReady.current = true
        }
    }, [audioState?.current_song[0]?.song_url])

    const presentPercent = duration ? `${(trackProgress / duration) * 100}%` : '0%';

    const trackStyling = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${presentPercent}, #fff), color-stop(${presentPercent}, #777))`;


    const calcTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnedMins = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60)
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
        return `${returnedMins}:${returnedSeconds}`;
    }

    const onScrub = (val) => {
        clearInterval(intervalRef.current)
        audioRef.current.currentTime = val
        setTrackProgress(audioRef.current.currentTime)
    }

    const onScrubEnd = () => {
        if (!isPlaying) {
            setIsPlaying(true)
        }
        startTimer()
    }

    const onVolChange = (val) => {
        audioRef.current.volume = val
        setVolume(val)
    }

    const startTimer = () => {
        clearInterval(intervalRef.current)
        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) {
                skipSong()
                audioRef.current.volume = volume
                setVolume(volume)
            } else {
                setTrackProgress(audioRef.current.currentTime)
            }
        }, [1000])
    }
    const skipSong = async () => {
        if (audioState.queue.length > 0) {
            await dispatch(audioplayerActions.skipSong())
            setCurrentTrack(audioState.current_song[0].song_url)
            setIsPlaying(true)
        } else {
            await dispatch(audioplayerActions.skipSong())
        }
    }

    const goBack = () => {
        if (audioState?.current_song[0]?.song_url) {
            setIsPlaying(false)
            setCurrentTrack(audioState.current_song[0].song_url)
            setTrackProgress(0)
            setIsPlaying(true)
            audioRef.current.currentTime = 0
            audioRef.current.volume = volume
        }
    }

    let skipSongButton

    if (audioState?.queue) {
        skipSongButton = (
            <button style={{ cursor: "pointer", background: "none", border: "none" }} onClick={skipSong}>
                <i class="fa-solid fa-forward fa-2x"></i>
            </button>
        )
    }

    let backButton

    if (audioState?.current_song) {
        backButton = (
            <button style={{ cursor: "pointer", background: "none", border: "none" }} onClick={goBack}>
                <i class="fa-solid fa-backward fa-2x"></i>
            </button>
        )
    }

    let playPauseButton = (
        <button style={{ cursor: "pointer", background: "none", border: "none" }} onClick={() => setIsPlaying(true)}>
            <i class="fa-solid fa-circle-play fa-3x"></i>
        </button>
    )

    if (isPlaying && audioState?.current_song[0]?.song_url) {
        playPauseButton = (
            <button style={{ cursor: "pointer", background: "none", border: "none" }} onClick={() => setIsPlaying(false)}>
                <i class="fa-solid fa-circle-pause fa-3x"></i>
            </button>
        )
    } else {
        playPauseButton = (
            <button style={{ cursor: "pointer", background: "none", border: "none" }} onClick={() => setIsPlaying(true)}>
                <i class="fa-solid fa-circle-play fa-3x"></i>
            </button>
        )
    }

    let volumeButton

    if (audioRef.current.volume !== 0 && audioRef.current.volume <= 0.4) {
        volumeButton = (
            <button style={{ cursor: "pointer", marginTop: "20px", display: "flex", alignItems: "center", background: "none", border: "none", width: "50px" }} onClick={(e) => audioRef.current.volume = 0}>
                <i class="fa-solid fa-volume-low"></i>
            </button>
        )
    } else if (audioRef.current.volume !== 0 && audioRef.current.volume > 0.4) {
        volumeButton = (
            <button style={{ cursor: "pointer", marginTop: "20px", display: "flex", alignItems: "center", background: "none", border: "none", width: "50px" }} onClick={(e) => audioRef.current.volume = 0}>
                <i class="fa-solid fa-volume-high"></i>
            </button>
        )
    } else {
        volumeButton = (
            <button style={{ cursor: "pointer", marginTop: "20px", display: "flex", alignItems: "center", background: "none", border: "none", width: "50px" }} onClick={(e) => { setVolume(volume); audioRef.current.volume = volume; }}>
                <i class="fa-solid fa-volume-xmark"></i>
            </button>
        )
    }
    return (
        <>

            <div>
                <div style={{ marginLeft: "400px" }}>
                    {backButton}
                    {playPauseButton}
                    {skipSongButton}
                </div>
                <div style={{ marginTop: "-10px", marginLeft: "250px", display: "flex" }}>
                    <span style={{ display: "flex", alignItems: "center", marginTop: "20px", width: "50px" }}>{trackProgress ? calcTime(trackProgress) : "--:--"}</span>
                    &nbsp;
                    <div className='track-length-range'>
                        <input
                            type='range'
                            value={trackProgress}
                            step="1"
                            min="0"
                            max={duration ? duration : `${duration}`}
                            onChange={(e) => onScrub(e.target.value)}
                            onMouseUp={onScrubEnd}
                            onKeyUp={onScrubEnd}
                            style={{ background: trackStyling }}
                        />
                    </div>
                    &nbsp;
                    <span style={{ display: "flex", alignItems: "center", marginTop: "20px", width: "50px", marginLeft: "5px" }}>{audioState?.current_song[0]?.duration ? audioState?.current_song[0]?.duration : "--:--"}</span>
                    {volumeButton}
                    &nbsp;
                    &nbsp;
                    <div className='volume-range'>
                        <input
                            type='range'
                            value={volume}
                            step="0.01"
                            min="0"
                            max="1"
                            onChange={(e) => onVolChange(e.target.value)}
                            style={{ width: "100px", display: "flex" }}
                        />
                    </div>
                </div>
            </div>
        </>
    )

}

export default AudioPlayerComponent
