import React from 'react'
import { getPrettyDate } from '../lib/get-date'
import Action from '../subComponents/Action';
import './HomePage.css'
import DayMetrics from '../subComponents/HomePage/DayMetrics';
import ActionCapsule from '../subComponents/HomePage/ActionCapsule';

function HomePage() {
  return (
    <div>
      <div className="user-hud">
      <div className="todos">
        <h1>Actions</h1>
        <ActionCapsule />
      </div>
        <div className="in-action">
            <h1>{getPrettyDate()}</h1>
            <DayMetrics />
            <Action />
            <Action />
            <Action />
            <Action />
            <Action />
            <Action />
            <Action />
          </div>
      </div>

    </div>
  );
}

export default HomePage;