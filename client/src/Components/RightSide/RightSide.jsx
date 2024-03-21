import React, { useState } from 'react'
import "./RightSide.css"
import Home from "../../images/home.png"
import Noti from "../../images/noti.png"
import Commmit from "../../images/comment.png"
import { UilSetting } from "@iconscout/react-unicons"
import TrandCard from '../TrandCard/TrandCard'
import ShareModal from '../ShareModal/ShareModal'
import { Link } from 'react-router-dom'
const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false)

  return (
    <div className='RightSide'>

      <div className='navIcons'>
        <Link to="../home">
          <img src={Home} alt="" />
        </Link>
        <UilSetting />
        <img src={Noti} alt="" />
        <img src={Commmit} alt="" />
      </div>

      <TrandCard />

      <button onClick={() => setModalOpened(true)} className='button r-btn'>share</button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  )
}

export default RightSide