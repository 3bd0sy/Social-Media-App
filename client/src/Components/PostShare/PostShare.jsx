import React, { useState, useRef } from 'react'
import "./PostShare.css"
import Profileimg from "../../images/profileImg.jpg"
import { UilScenery } from "@iconscout/react-unicons"
import { UilPlayCircle } from "@iconscout/react-unicons"
import { UilLocationPoint } from "@iconscout/react-unicons"
import { UilSchedule } from "@iconscout/react-unicons"
import { UilTimes } from "@iconscout/react-unicons"
import { useDispatch, useSelector } from 'react-redux'
import { upLoadImg, uploadPost } from '../../actions/UploadAction'
const PostShare = () => {
    const [img, setImg] = useState(null)
    const dispatch = useDispatch()
    const imgRef = useRef()
    const desc = useRef()
    const imgChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImg(img)
        }
    }
    const { user } = useSelector((state) => state.authReducer.authData)

    const reset = () => {
        setImg(null)
        desc.current.value = ""
    }
    const publicServer = process.env.REACT_APP_PUBLIC_FOLDER
    const handleSubmit = (e) => {
        e.preventDefault()
        const newPost = {
            userId: user._id
            , desc: desc.current.value
        }

        if (img) {
            const data = new FormData()

            const fileName = Date.now() + img.name
            data.append("name", fileName)
            data.append("file", img)
            newPost.image = fileName
           
            try {
                dispatch(upLoadImg(data))
            } catch (error) {
                console.log(error)
            }
        }
        dispatch(uploadPost(newPost))
        reset()
    }
    return (
        <div className='PostShare'>
            <img src={user.profilePicture ? publicServer + user.profilePicture : publicServer + "defaultProfile.png"} alt="" />
            <div className='input-post'>
                <input
                    ref={desc} required type="text" placeholder='what is happening' />

                <div className="postoption">
                    <div className="option"
                        onClick={() => imgRef.current.click()}
                        style={{ color: "var(--photo)" }}>
                        <UilScenery />
                        Photo
                    </div>
                    <div className="option" style={{ color: "var(--video)" }}>
                        <UilPlayCircle />
                        Video
                    </div>
                    <div className="option" style={{ color: "var(--location)" }}>
                        <UilLocationPoint />
                        Location
                    </div>
                    <div className="option" style={{ color: "var(--shedule)" }}>
                        <UilSchedule />
                        Shedule
                    </div>
                    <button className='button postshare-btn'
                        onClick={handleSubmit}
                    >share</button>
                    <div style={{ display: "none" }}>
                        <input type="file" ref={imgRef} onChange={imgChange} />
                    </div>
                </div>
                {img && (
                    <div className="previewimg">
                        <UilTimes onClick={() => { setImg(null) }} />
                        <img src={URL.createObjectURL(img)} alt="" />
                    </div>
                )}
            </div>
        </div>
    )
}

export default PostShare