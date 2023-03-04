import React from 'react'
import './Action.css'
import { toggleDrawer } from '../lib/toggleDrawer'

function Action() {
    return (
      <div className='action' onClick={(event) => toggleDrawer(event)}>
        <div className='action-info'>
          <p className='action-name'>Action</p>
          <p className='action-cat'>Category</p>
          <p className='action-points'>3</p>
        </div>
        <p className='action-description'>Description of action</p>
      </div>
    );
}

export default Action