import React from 'react'
import './SprintMetrics.css'

export default function SprintMetrics() {
    return(
        <div className='sprint-metrics-wrapper'>
            <h2>Sprint Metrics</h2>
            <div className="sprint-metrics-block">
                <div className="metric">
                    <h3>Accuracy</h3>
                    <p>0%</p>
                </div>
                <div className="metric">
                    <h3>Points Completed</h3>
                    <p>0%</p>
                </div>
                <div className="metric">
                    <h3>Sprint Completed</h3>
                    <p>0%</p>
                </div>
                <div className="metric">
                    <h3>Balance Profile</h3>
                    <p>Mind: 0%, Body: 0%</p>
                </div>
            </div>
        </div>
    )
}