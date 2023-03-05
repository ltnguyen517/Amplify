import React, { useState, useEffect } from 'react';
import { Link, NavLink, useHistory, useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import "./ProfileDropDown.css"

const ProfileDropDown = () => {
    const sessionUser = useSelector((state) => state.session.user)
    const [showMenu, setShowMenu] = useState(false)

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true)
    }

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    return (
        <div className='pfdropdownarea'>
            <button id="ddbutton" onClick={openMenu}>
                <i style={{ marginTop: "5px", marginLeft: "1px", fontSize: "20px" }} class="fa-solid fa-circle-user"></i>
                <div style={{ marginTop: "5px", width: "fit-content", marginLeft: "5px" }}>{sessionUser.username}</div>
            </button>
            {showMenu && (
                <div className='dd'>
                    <div>
                        <Link style={{ textDecoration: "none", color: "gray", fontSize: "14px", marginLeft: "12px" }} onClick={async (e) => await fetch(`/api/users/${sessionUser.id}`)} to={`/user/${sessionUser.id}`}>Profile</Link>
                    </div>
                    <hr></hr>
                    <div className='ddlogoutbutton' style={{fontSize: "14px"}}><LogoutButton /></div>
                </div>
            )}
        </div>
    )
}

export default ProfileDropDown
