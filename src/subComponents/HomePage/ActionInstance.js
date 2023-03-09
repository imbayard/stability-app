import React, { useState } from 'react'

import './ActionInstance.css'

export default function ActionInstance({action}) {

    const [actionClicked, clickAction] = useState(false)

    function handleClick() {
        clickAction(!actionClicked)
    }

    return (
        <div className="action-instance">
            <div className="action-name">{action.name}</div>
            <div className="category">{action.category}</div>
            <div className="points">{action.points}</div>
            <button style={actionClicked? 
                {
                    // Clicked
                    backgroundColor: '#2ecc71', 
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