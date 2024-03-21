import React from 'react'
import "./ProfileLeft.css"
import LogoSearch from '../LogoShearch/LogoSearch'
import FollowersCard from '../FollowersCard/FolloersCard'
import  InfoCard  from '../InfoCard/InfoCard'
export const ProfileLeft = () => {
    return (
        <div className='ProfileLeft '>
            <LogoSearch />
            <InfoCard />
            <FollowersCard />
        </div>
    )
}
