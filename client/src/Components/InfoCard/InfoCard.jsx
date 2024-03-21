import React, { useEffect, useState } from 'react'
import "./InfoCard.css"
import { UilPen } from "@iconscout/react-unicons"
import ProfileModal from '../ProfileModal/ProfileModal'
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import * as UserApi from "../../API/UserRequest"
import { logOut } from '../../actions/AuthActions'
const InfoCard = () => {
    const [modalOpened, setModalOpened] = useState(false)
    const dispatch = useDispatch()
    const params = useParams()
    const profileUserId = params.id
    const [profileUser, setProfileUser] = useState({})
    const { user } = useSelector((state) => state.authReducer.authData)


    useEffect(() => {
        const fetchProfileUser = async () => {
            if (profileUserId === user._id) {
                setProfileUser(user)
            } else {
                const profileUser = await UserApi.getUser(profileUserId)
                setProfileUser(profileUser)
            }
        }
        fetchProfileUser()
    }, [user]
    )
    const handleLogOut = () => {
        dispatch(logOut())
    }

    return (
        <div className='InfoCard'>
            <h4 >Profile info</h4>
            {user._id === profileUserId ?
                <div className="infoHead">
                    <UilPen width="2rem" hieght='1.2rem' onClick={() => { setModalOpened(true);  }} />
                    <ProfileModal data={user} modalOpened={modalOpened} setModalOpened={setModalOpened} />
                </div>
                : ""}

            <div className="info">
                <span>
                    <b>Status </b>
                </span>
                <span>{profileUser.relationship}</span>
            </div>

            <div className="info">
                <span>
                    <b>Lives in </b>
                </span>
                <span>{profileUser.livesin}</span>
            </div>

            <div className="info">
                <span>
                    <b>Works at </b>
                </span>
                <span>{profileUser.workAt}</span>
            </div>

            <button onClick={handleLogOut} className="button info-btn">
                LogOut
            </button>

        </div>
    )
}

export default InfoCard