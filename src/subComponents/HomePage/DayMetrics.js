import React from 'react'
import Action from '../Action'
import './DayMetrics.css'

export default function DayMetrics() {
    return (
        <div class='day-metrics'>
            <div class="metric">
              <h3>Points</h3>
              <p>150</p>
            </div>
            <div class="metric">
              <h3>Completed</h3>
              <p>3/5</p>
            </div>
            <div class="metric">
              <h3>Intensity</h3>
              <p>High</p>
            </div>
            <div class="metric">
              <h3>Balance</h3>
              <p>5/10</p>
            </div>
          </div>
    )
}