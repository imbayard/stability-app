export function determineIntensity(points) {
    let intensity = 'Chill'
    const isChillRange = points >= 0 && points < 3
    const isBalancedRange = !isChillRange && points <= 7
    if(isBalancedRange) {
      intensity = 'Balanced'
    } else if (!isChillRange) {
      intensity = 'Intense'
    }

    return intensity
}

export function mapActionsToTotals(actions) {
    let sumPoints = 0
    let numMind = 0
    let numBody = 0
    let numCompleted = 0
    actions.forEach(action => {
      // Update Points
      sumPoints = sumPoints + action.points
      // Update Balance
      numMind = numMind + ((action.category === 'mind') ? 1 : 0)
      numBody = numBody + ((action.category === 'body') ? 1 : 0)
      numCompleted = numCompleted + ((action.completed) ? 1 : 0)
    })

    return {
        points: sumPoints,
        numMind,
        numBody,
        completed: numCompleted,
        total: actions.length
    }
}
