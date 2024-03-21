import { useDispatch, useSelector } from "react-redux";
import "./ProfileModal.css";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { upLoadImg } from "../../actions/UploadAction";
import { updateUser } from "../../actions/UserAction";
export default function ProfileModal({ modalOpened, setModalOpened, data }) {

    if (modalOpened) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }
    const { password, ...other } = data
    const [formData, setFormData] = useState(other)
    const [profileImg, setProfileImg] = useState(null)
    const [converImg, setConverImg] = useState(null)
    const dispatch = useDispatch()
    const param = useParams()
    const { user } = useSelector((state) => state.authReducer.authData)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const onImgChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            event.target.name === "profilePicture" ? setProfileImg(img) : setConverImg(img);
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        let userDate = formData;

        if (profileImg) {
            const data = new FormData()
            const fileName = Date.now() + profileImg.name
            data.append("name", fileName)
            data.append("file", profileImg)
            userDate.profilePicture = fileName
            try {
                dispatch(upLoadImg(data))
            } catch (error) {
                console.log(error)
            }
        }
        if (converImg) {
            const data = new FormData()
            const fileName = Date.now() + converImg.name
            data.append("name", fileName)
            data.append("file", converImg)
            userDate.coverPicture = fileName
            try {
                dispatch(upLoadImg(data))
            } catch (error) {
                console.log(error)
            }
        }
        dispatch(updateUser(param.id, userDate))
        setModalOpened(false)
    }
    return (
        <>
            <div className="modal-continer">
                {modalOpened && (
                    <div className="modal">
                        <div onClick={() => setModalOpened(false)} className="overlay"></div>
                        <div className="modal-content">

                            <form className="infoForm">
                                <h3>Your Info</h3>
                                <div>
                                    <input value={formData.firstname} onChange={handleChange} type="text" className="infoInput" name="firstname" placeholder="First Name" />
                                    <input type="text" value={formData.lastname} onChange={handleChange} className="infoInput" name="lastname" placeholder="Last Name" />
                                </div>

                                <div>
                                    <input type="text" value={formData.workAt} onChange={handleChange} className="infoInput" name="workAt" placeholder="Works at" />
                                </div>

                                <div>
                                    <input type="text" value={formData.livesin} onChange={handleChange} className="infoInput" name="livesin" placeholder="LIves in" />
                                    <input type="text" value={formData.country} onChange={handleChange} className="infoInput" name="country" placeholder="Country" />
                                </div>

                                <div>
                                    <input type="text" value={formData.relationship} onChange={handleChange} name="relationship" className="infoInput" placeholder="RelationShip Status" />
                                </div>


                                <div>
                                    Profile Image
                                    <input type="file" onChange={onImgChange} name='profilePicture' />
                                    Cover Image
                                    <input type="file" onChange={onImgChange} name="coverPicture" />
                                </div>

                                <button className="button infoButton" onClick={handleSubmit}>Update</button>

                            </form>
                            <button className="close-modal" onClick={() => setModalOpened(false)}>
                                X
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}