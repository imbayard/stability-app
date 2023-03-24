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

  const handleDrop = async (e) => {
    e.preventDefault();
    const action = JSON.parse(e.dataTransfer.getData('application/json'));
    console.log(action)
    // Add the dropped action to the list of action instances
    // You can also save the updated list to the database here, if needed
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const {userId, email} = useContext(UserInfoContext)
  const [redirect, setRedirect] = useState(false)
  return (
    <div>
      <div className="user-hud">
        <div className="todos">
          <h1 onClick={() => setRedirect(true)}>Actions<p className='new-action'>New Action</p></h1>
          <p style={{fontSize: 'small', textAlign: 'center', fontStyle: 'italic'}}>Drag & Drop</p>
          <ActionCapsule 
            userId={userId}
          />
        </div>
        <div className="in-action">
            <h1>{getPrettyDate()}</h1>
            <DayMetrics />
            <div
              className="action-instances"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
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