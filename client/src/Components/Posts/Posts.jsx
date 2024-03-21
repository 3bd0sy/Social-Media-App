import React, { useEffect } from 'react'
import "./Posts.css"
import Post from '../Post/Post'
import { useDispatch, useSelector } from "react-redux"
import { getTimeLinePosts } from '../../actions/PostAction'
const Posts = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.authReducer.authData)
    let { posts } = useSelector((state) => state.postReducer)
    useEffect(() => {
        dispatch(getTimeLinePosts(user._id))
    }, [])
    if (!posts) return "no posts"
    return (
        <div className='posts'>
            {posts.map((post, id) => {
                return <Post key={id} data={post} id={id} />
            })}
        </div>
    )
}

export default Posts