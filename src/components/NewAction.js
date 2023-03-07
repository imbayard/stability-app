import React, {useState, useEffect} from 'react';
import './NewAction.css';

//sub-components
import Action from '../subComponents/Action';

//api call
import { default as getInfoForNewActionPage } from '../lib/page-calls/new-action-api'

function NewActionPage() {
    const [isToggled, setIsToggled] = useState(false);
    const [points, setPoints] = useState(undefined)
    const [category, setCategory] = useState("")

    const handleCategoryChange = (event) => {
        setCategory(event.target.value)
    }
    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        getInfoForNewActionPage('abc', setUserInfo)
    }, [])

  return (
    <div>
      <div className='new-action-div'>
        <h1 className='new-action-head'>Add a new action?</h1>
        <p className='new-action-p'>You've been consistently taking action. It's impressive! If you are ready to challenge yourself, add a new goal. If not, keep going! You got this!</p>
      </div>
      <div className='new-action-div2'>
        <button className='stable-button' onClick={() => setIsToggled(!isToggled)}>{isToggled ? 'No' : 'Yes'}</button>
        <div className={isToggled ? 'add-action-div active' : 'add-action-div'}>
            <form>
                <label htmlFor="name">Action Name:</label>
                <input type="text" id="name" name="name" maxLength="20" required />
                <label htmlFor="category">Category:</label>
                <select id="category" name="category" value={category} onChange={handleCategoryChange} required>
                    <option value="">Select...</option>
                    <option value="body">Body</option> 
                    <option value="mind">Mind</option>
                </select>
                <label htmlFor="points">Points:</label>
                <input type="range" id="points" name="points" min="1" max="5" onChange={(e) => {setPoints(e.target.value)}} required />
                <output htmlFor="points">{points}</output>
                <button className="stable-button">Submit</button>
            </form>
        </div>
      </div>
      <div className='new-action-div'>
        <h1 className='new-action-head'>Your Current Actions</h1>
        <div className='two-column'>
            <div className='column'>
                <h3>Body</h3>
                <Action />
            </div>
            <div className='column'>
                <h3>Mind</h3>
                <Action />
                <Action />
            </div>
        </div>
      </div>
    </div>
  );
}

export default NewActionPage;