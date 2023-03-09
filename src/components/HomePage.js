import React from 'react'
import { getPrettyDate } from '../lib/get-date'
import './HomePage.css'
import DayMetrics from '../subComponents/HomePage/DayMetrics';
import ActionCapsule from '../subComponents/HomePage/ActionCapsule';
import Quote from '../subComponents/HomePage/Quote'
import SprintMetrics from '../subComponents/HomePage/SprintMetrics';
import ActionInstance from '../subComponents/HomePage/ActionInstance';

function HomePage() {
  const action = {
    name: "Workout",
    category: "Body",
    points: 3
  }
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
            <div className='action-instances'>
              <ActionInstance action={action}/>
              <ActionInstance action={action}/>
              <ActionInstance action={action}/>
              <ActionInstance action={action}/>
            </div>
        </div>
      </div>
      <Quote />
      <SprintMetrics />
    </div>
  );
}

export default HomePage;