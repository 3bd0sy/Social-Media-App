import React from 'react'
import "./ProfileSide.css"
import LogoShearch from '../LogoShearch/LogoSearch'
import ProfileCard from '../ProfileCard/ProfileCard'
import FolloersCard from '../FollowersCard/FolloersCard'
const ProfileSide = () => {
  return (
    <div className='profileside'>
        <LogoShearch/>
        <ProfileCard location="profileSide"/>
        <FolloersCard/>
    </div>
  )
}

export default ProfileSide