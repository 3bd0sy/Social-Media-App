import React from 'react'
import "./LogoShearch.css"
import Logo from "../../images/logo.png"
import {UilSearch} from "@iconscout/react-unicons"
// import UilReact from '@iconscout/react-unicons/icons/uil-react'

const LogoSearch = () => {
  return (
    <div className='logosearch'>
        <img src={Logo} alt="" />
        <div className="search">
            <input type="text" name="" id="Explore" placeholder='#Explore'/>
            <div className='s-icon'>
                <UilSearch/>
            </div>
        </div>
        </div>
  )
}

export default LogoSearch