import React from 'react'
import "./TrandCard.css"
import { TrendData } from "../../Data/TrandData"
const TrandCard = () => {
    return (
        <div className='TrandCard'>
            <h3>Trands For You</h3>

            {TrendData.map((item, id) => {
                return <div className="trand" key={id}>
                    <span>#{item.name}</span>
                    <span>{item.shares}k shares</span>
                </div>
            })}
        </div>
    )
}

export default TrandCard