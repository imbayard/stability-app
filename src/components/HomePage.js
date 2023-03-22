import React, {useState, useContext} from 'react'
import { getPrettyDate } from '../lib/get-date'
import './HomePage.css'
import DayMetrics from '../subComponents/HomePage/DayMetrics';
import ActionCapsule from '../subComponents/HomePage/ActionCapsule';
import Quote from '../subComponents/HomePage/Quote'
import SprintMetrics from '../subComponents/HomePage/SprintMetrics';
import ActionInstance from '../subComponents/HomePage/ActionInstance';
import { Navigate } from 'react-router-dom';
import { UserInfoContext } from '../App';

function HomePage() {
  const action = {
    name: "Workout",
    category: "Body",
    points: 3
  }
  const {userId, email} = useContext(UserInfoContext)
  const [redirect, setRedirect] = useState(false)
  return (
    <div>
      <div className="user-hud">
        <div className="todos">
          <h1 onClick={() => setRedirect(true)}>Actions<p className='new-action'>New Action</p></h1>
          <ActionCapsule 
            userId={userId}
          />
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
      {redirect && <Navigate to={'/new-action'}/>}
    </div>
  );
}

export default HomePage;