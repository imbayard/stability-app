import React from 'react'
import Action from '../Action'

import './ActionCapsule.css'

export default function ActionCapsule() {
    return (
        <div className="action-capsules">
          <div className="mind">
            <h2>Mind</h2>
            <div className="action-capsule">
              <Action />
              <Action />
            </div>
          </div>
          <div className="body">
            <h2>Body</h2>
            <div className="action-capsule">
              <Action />
              <Action />
            </div>
          </div>
        </div>
    )
}