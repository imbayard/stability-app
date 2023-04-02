import React, {useState, useContext, useEffect} from 'react'
import { getPrettyDate } from '../lib/get-date'
import './HomePage.css'
import DayMetrics from '../subComponents/HomePage/DayMetrics';
import ActionCapsule from '../subComponents/HomePage/ActionCapsule';
import Quote from '../subComponents/HomePage/Quote'
import SprintMetrics from '../subComponents/HomePage/SprintMetrics';
import ActionInstance from '../subComponents/HomePage/ActionInstance';
import { Navigate } from 'react-router-dom';
import { UserInfoContext } from '../App';
import { getTodayActions } from '../lib/page-calls/homepage-api';

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
    const actions = [...actionsToday, action]
    setActionsToday(actions)
    updateDayContext(actions)
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const updateDayContext = (actions) => {
    let sumPoints = 0
    let numMind = 0
    let numBody = 0
    actions.forEach(action => {
      // Update Points
      sumPoints = sumPoints + action.points
      // Update Balance
      numMind = numMind + ((action.category === 'mind') ? 1 : 0)
      numBody = numBody + ((action.category === 'body') ? 1 : 0)
    })
    setDayContext((prevContext) => ({
      ...prevContext,
      points: sumPoints,
      balance: `${numMind} : ${numBody}`
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
              { 
              actionsToday? 
              actionsToday.map(action => {
                return(
                  <ActionInstance action={action} key={action.name}/>
                )
              }) : <></>
              }
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