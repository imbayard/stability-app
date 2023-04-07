import React, {useState} from 'react';
import ActionInstance from './ActionInstance'

function ActionsToday({
  actionsToday,
  onActionsTodayChange
}){
  const [updatedActionsToday, setUpdatedActionsToday] = useState(actionsToday);

  function handleActionChange(updatedAction) {
    const updatedActions = actionsToday.map((action) =>
      action.id === updatedAction.id ? updatedAction : action
    )
    setUpdatedActionsToday(updatedActions)
    onActionsTodayChange(updatedActions)
  }

  return (
    <>
      {actionsToday ? (
        actionsToday.map((action) => (
          <ActionInstance action={action} key={action.id} onActionChange={handleActionChange} />
        ))
      ) : (
        <h1>Add Actions From The Left</h1>
      )}
    </>
  );
}

export default ActionsToday;