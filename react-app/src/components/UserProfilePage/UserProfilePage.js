import React, { useEffect, useState } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as followingUserStore from "../../store/followinguser";
import Error404Page from "../ErrorPage/ErrorPage";
import UserOwnPlaylists from "./UserOwnPlaylists";
import UserFollowedPlaylists from "./UserFollowedPlaylists";
import UserFollowers from "./UserFollowers";
import UserFollowing from "./UserFollowing";
import "./UserProfilePage.css"

const UserProfilePage = () => {

};

export default UserProfilePage;
