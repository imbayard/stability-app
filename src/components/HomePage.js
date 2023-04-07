import React, {useState, useContext, useEffect} from 'react'
import { getPrettyDate } from '../lib/get-date'
import './HomePage.css'
import DayMetrics from '../subComponents/HomePage/DayMetrics';
import ActionCapsule from '../subComponents/HomePage/ActionCapsule';
import Quote from '../subComponents/HomePage/Quote'
import SprintMetrics from '../subComponents/HomePage/SprintMetrics';
import { Navigate } from 'react-router-dom';
import { UserInfoContext } from '../App';
import { getTodayActions, updateDay } from '../lib/page-calls/homepage-api';
import { determineIntensity, mapActionsToTotals } from '../lib/homepage/homepage-utils';
import ActionsToday from '../subComponents/HomePage/TodaysActions';
import { v4 as uuidv4 } from 'uuid'

function HomePage() {
  useEffect(() => {
    async function fetchData() {
      const actions = await getTodayActions(userId, setActionsToday)
      setActionsTruth(actions)
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
    e.preventDefault()
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

  const handleSave = async (event) => {
    event.preventDefault()

    setSaveButtonLoading(true)
    const actionsSet = actionsToday.filter(action => !action.completed).map(action => ({name: action.name, points: action.points, category: action.category}))
    const actionsComplete = actionsToday.filter(action => action.completed).map(action => ({name: action.name, points: action.points, category: action.category}))

    try{
      await updateDay(userId, actionsSet, actionsComplete, dayContext.points, 0)
    } catch (err) {
      console.log(err)
    }
    setSaveButtonLoading(false)
  }

  const {userId, email} = useContext(UserInfoContext)
  const [redirect, setRedirect] = useState(false)
  const [saveButtonLoading, setSaveButtonLoading] = useState(false)
  const [actionsToday, setActionsToday] = useState([])
  const [actionsTruth, setActionsTruth] = useState([])
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
              {actionsTruth !== actionsToday && (
                <button onClick={handleSave} style={{fontSize: 'large'}}>
                  {saveButtonLoading ? 'Saving...' : 'Save'}
                </button>
              )}
            </div>
        </div>
      </div>
      <Quote />
      <SprintMetrics />
      {redirect && <Navigate to={'/new-action'}/>}
    </div>
  );
}

export default HomePage