import React, { useEffect, useState } from 'react'
import "./FolloersCard.css"
import User from '../User/User'
import { useSelector } from 'react-redux'
import { getAllUsers } from '../../API/UserRequest'
const FollowersCard = () => {
    const { user } = useSelector((state) => state.authReducer.authData)
    const [persons, setPersons] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            const { data } = await getAllUsers();
            setPersons(data)
        }
        fetchUsers()
    }, [])
    return (
        <div className='followercard'>
            <h3>People you may know</h3>
            {persons.map((person, id) => {
                if (person._id !== user._id) {
                    return <User person={person} id={id} key={id} />
                }
            })}
        </div>
    )
}

export default FollowersCard