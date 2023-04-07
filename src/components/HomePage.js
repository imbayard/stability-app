import React, {useState, useContext, useEffect} from 'react'
import { getPrettyDate } from '../lib/get-date'
import './HomePage.css'
import DayMetrics from '../subComponents/HomePage/DayMetrics';
import ActionCapsule from '../subComponents/HomePage/ActionCapsule';
import Quote from '../subComponents/HomePage/Quote'
import SprintMetrics from '../subComponents/HomePage/SprintMetrics';
import { Navigate } from 'react-router-dom';
import { UserInfoContext } from '../App';
import { getTodayActions } from '../lib/page-calls/homepage-api';
import { determineIntensity, mapActionsToTotals } from '../lib/homepage/homepage-utils';
import ActionsToday from '../subComponents/HomePage/TodaysActions';
import { v4 as uuidv4 } from 'uuid'

function HomePage() {
  useEffect(() => {
    async function fetchData() {
      const actions = await getTodayActions(userId, setActionsToday)
      updateDayContext(actions)
    }
    fetchData()
  }, [])

  const handleDrop = async (e) => {
    e.preventDefault();
    const action = JSON.parse(e.dataTransfer.getData('application/json'));
    const actions = [...actionsToday, action].map(action => ({...action, id: uuidv4()}))
    setActionsToday(actions)
    updateDayContext(actions)
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleActionsTodayChange = (updatedActions) => {
    updateDayContext(updatedActions)
    setActionsToday(updatedActions)
  }

  const updateDayContext = (actions) => {
    const {points, numMind, numBody, completed, total} = mapActionsToTotals(actions)
    setDayContext((prevContext) => ({
      ...prevContext,
      points,
      balance: `${numMind} : ${numBody}`,
      intensity: determineIntensity(points),
      completed: `${completed}/${total}`
    }));
  }

  const {userId, email} = useContext(UserInfoContext)
  const [redirect, setRedirect] = useState(false)
  const [actionsToday, setActionsToday] = useState([])
  const [dayContext, setDayContext] = useState({
    points: 0,
    completed: '0/0',
    intensity: 'None',
    balance: '0:0'
  })

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
            <DayMetrics context={dayContext}/>
            <div
              className="action-instances"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <ActionsToday 
                actionsToday={actionsToday}
                onActionsTodayChange={handleActionsTodayChange}
              />
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