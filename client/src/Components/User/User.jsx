import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getAllUsers } from '../../API/UserRequest';
import profile from "../../images/profileImg.jpg"
import { useDispatch } from "react-redux"
import { followUser, unFollowUser } from '../../actions/UserAction';

const User = ({ person, id }) => {
    const publicServer = process.env.REACT_APP_PUBLIC_FOLDER
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.authReducer.authData)
    const [isFollowing, setIsFollowing] = useState(person.followers.includes(user._id))
    const handleFollow = () => {
        !isFollowing ?
            dispatch(followUser(person._id, user)) :
            dispatch(unFollowUser(person._id, user));
        setIsFollowing((prev) => !prev)
    }
    return (
        <div key={id} className='follower'>
            <div>
                <img className='followerimg' src={person.profilePicture ? publicServer + person.profilePicture : publicServer + "defaultProfile.png"} alt="" />

                <div className="name">
                    <span>{person.firstname + " " + person.lastname}</span>
                    <span>@{person.username}</span>
                </div>
            </div>
            <button onClick={handleFollow} className={isFollowing?"button follow-card-btn unfollow_btn":"button follow-card-btn"}>{isFollowing ? "UnFollow" : "Follow"}</button>
        </div>)
}

export default User