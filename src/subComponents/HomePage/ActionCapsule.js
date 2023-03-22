import React, { useState, useEffect, useContext } from 'react';
import Action from '../Action';
import { getActions } from '../../lib/page-calls/homepage-api';

import './ActionCapsule.css';
import { UserInfoContext } from '../../App';

export default function ActionCapsule() {
  const [actions, setActions] = useState([]);
  const { userId, email } = useContext(UserInfoContext)

  useEffect(() => {
    async function fetchData() {
      await getActions(userId, setActions);
    }
    fetchData();
  }, []);

  return (
    <>
      { actions.length > 0 ? (
        <div className="action-capsules">
          <div className="mind">
            <h2>Mind</h2>
            <div className="action-capsule">
              {actions
                .filter((action) => action.category === 'mind')
                .map((action) => (
                  <Action key={action.name} action={action} />
                ))}
            </div>
          </div>
          <div className="body">
            <h2>Body</h2>
            <div className="action-capsule">
              {actions
                .filter((action) => action.category === 'body')
                .map((action) => (
                  <Action key={action.name} action={action} />
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div className='create-new-action-prompt'>
          <p>Create a new action using the button above</p>
        </div>
      )}
    </>
  );
}