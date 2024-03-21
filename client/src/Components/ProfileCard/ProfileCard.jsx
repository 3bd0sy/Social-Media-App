import React from 'react'
import "./ProfileCard.css";
import Cover from "../../images/cover.jpg"
import profile from "../../images/profileImg.jpg"
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const ProfileCard = ({ location }) => {
    const { user } = useSelector((state) => state.authReducer.authData)
    const { posts } = useSelector((state) => state.postReducer)

    const publicServer = process.env.REACT_APP_PUBLIC_FOLDER
    const ProfilePage = location === "profilePage" ? true : false//profileSide
    return (
        <div className='profilecard'>

            <div className="prfileimgs">
                <img src={user.coverPicture ? publicServer + user.coverPicture : publicServer + "defaultCover.jpg"} alt="" />
                <img src={user.profilePicture ? publicServer + user.profilePicture : publicServer + "defaultProfile.png"} alt="" />
            </div>

            <div className="profilename">
                <span>{user.firstname} {user.lastname}</span>
                <span>{user.worksAt ? user.worksAt : "write about your self"}</span>
            </div>

            <div className="followstatus">
                <hr />
                <div >
                    <div className="follow">
                        <span>{user.following.length}</span>
                        <span> Following</span>
                    </div>

                    <div className="vl"></div>

                    <div className="follow">
                        <span>{user.followers.length}</span>
                        <span> Follows</span>
                    </div>

                    {ProfilePage && <>
                        <div className="vl">

                        </div>
                        <div className="follow">
                            <span>{posts.filter((post) => post.userId === user._id).length}</span>
                            <span>
                                Posts
                            </span>
                        </div>
                    </>}

                </div>
                <hr />
            </div>
            {ProfilePage ? "" : <span className='profile-btn'> <Link to={`/profile/${user._id}`} style={{ textDecoration: "none", color: "inherit" }}> my profile</Link></span>}
        </div >
    )
}

export default ProfileCard