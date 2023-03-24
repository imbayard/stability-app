import React from 'react'
import './Action.css'
import { toggleDrawer } from '../lib/toggleDrawer'

function Action({
  action
}) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('application/json', JSON.stringify(action));
  }
  return (
    <div 
      className='action' 
      onClick={(event) => toggleDrawer(event)}
      draggable='true'
      onDragStart={handleDragStart}
    >
      <div className='action-info'>
        <p className='action-name'>{action.name}</p>
        <p className='action-cat'>{(action.category).toUpperCase()}</p>
        <p className='action-points'>{action.points}</p>
      </div>
      <p className='action-description'>Description of action</p>
    </div>
  );
}

export default Action