import React from 'react'
import './DayMetrics.css'

export default function DayMetrics({
  context
}) {
  return (
      <div className='day-metrics'>
          <div className="metric">
            <h3>Points</h3>
            <p>{context.points}</p>
          </div>
          <div className="metric">
            <h3>Completed</h3>
            <p>{context.completed}</p>
          </div>
          <div className="metric">
            <h3>Intensity</h3>
            <p>{context.intensity}</p>
          </div>
          <div className="metric">
            <h3>Balance (Mind:Body)</h3>
            <p>{context.balance}</p>
          </div>
        </div>
  )
}