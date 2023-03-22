import React, { useState } from 'react'

import './ActionInstance.css'

export default function ActionInstance({action}) {

    const [actionClicked, clickAction] = useState(false)

    function handleClick() {
        clickAction(!actionClicked)
    }
    const fancyGreen = '#2ecc71'
    const textStyle =  actionClicked?
        {
            // Clicked
            color: '#fff',
            fontSize: 'large'
        } : {
            // Not clicked
            color: '#555'
        }
    const background =  actionClicked?
    {
        // Clicked
        backgroundColor: '#7ed19f'
    } : {
        // Not clicked
        backgroundColor: '#dddddd'
    }
    return (
        <div className="action-instance" style={background}>
            <div className="action-name" style={textStyle}>{action.name}</div>
            <div className="category" style={textStyle}>{action.category}</div>
            <div className="points" style={textStyle}>{action.points}</div>
            <button style={actionClicked? 
                {
                    // Clicked
                    backgroundColor: fancyGreen,
                    border: '1px solid white', 
                    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)'
                } : {
                    // Not clicked
                    backgroundColor: '#ADD8E6'
                }} 
                className='toggle-button' 
                onClick={handleClick} />
        </div>
    )
}