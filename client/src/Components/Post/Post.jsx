import React, { useEffect, useState } from 'react'
import "./Post.css"
import likedImg from "../../images/like.png"
import notliked from "../../images/notlike.png"
import share from "../../images/share.png"
import comment from "../../images/comment.png"
import { useSelector } from 'react-redux'
import { likePost } from '../../API/postRequest'
import { getUser } from "../../API/UserRequest";
const Post = ({ data, id }) => {
    const publicServer = process.env.REACT_APP_PUBLIC_FOLDER
    const { user } = useSelector((state) => state.authReducer.authData)
    const [liked, setLiked] = useState(data.likes.includes(user._id))
    const [likes, setLikes] = useState(data.likes.length)
    const [userData, setUserData] = useState()
    const handleClick = (e) => {
        setLiked((prev) => !prev)
        likePost(data._id, user._id)
        liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
    }
    console.log(data)
    useEffect(() => {
        const fetchData = async () => {
            let Data = await getUser(data.userId)
            // console.log(Data)
            setUserData(Data)
        }
        fetchData()
    }, [])

    return (
        <div className='post' key={id}>
            <div className='userInfo-post'>
                <img className='followerimg' src={userData?.data?.profilePicture ? publicServer + userData?.data?.profilePicture : publicServer + "defaultProfile.png"} alt="" />

                <div className="name">
                    <span>{userData?.data?.firstname + " " + userData?.data?.lastname}</span>
                    <span>@{userData?.data?.username}</span>
                </div>
            </div>


            <div className="details" style={{ marginLeft: "10px" }}>
                <span><b>{data.name}</b></span>
                <span> {data.desc}</span>
            </div>

            <img src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""} alt="" />

            <div className="postReact">
                <img src={liked ? likedImg : notliked} alt="" onClick={handleClick} style={{ cursor: "pointer" }} />
            <span style={{ marginLeft: "-10px" }}>{likes} likes</span>
                <img src={comment} alt="" />
                <img src={share} alt="" />
            </div>

        </div>
    )
}

export default Post