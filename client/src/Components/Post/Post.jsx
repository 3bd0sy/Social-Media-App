import React, { useState } from 'react'
import "./Post.css"
import likedImg from "../../images/like.png"
import notliked from "../../images/notlike.png"
import share from "../../images/share.png"
import comment from "../../images/comment.png"
import { useSelector } from 'react-redux'
import { likePost } from '../../API/postRequest'

const Post = ({ data, id }) => {
    const { user } = useSelector((state) => state.authReducer.authData)
    const [liked, setLiked] = useState(data.likes.includes(user._id))
    const [likes, setLikes] = useState(data.likes.length)
    const handleClick = (e) => {
        setLiked((prev) => !prev)
        likePost(data._id, user._id)
        liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
    }
    return (
        <div className='post' key={id}>
            <img src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""} alt="" />

            <div className="postReact">
                <img src={liked ? likedImg : notliked} alt="" onClick={handleClick} style={{ cursor: "pointer" }} />
                <img src={comment} alt="" />
                <img src={share} alt="" />
            </div>

            <span style={{ marginLeft: "10px" }}>{likes} likes</span>

            <div className="details" style={{ marginLeft: "10px" }}>
                <span><b>{data.name}</b></span>
                <span> {data.desc}</span>
            </div>
        </div>
    )
}

export default Post