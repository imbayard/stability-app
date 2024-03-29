import axios from 'axios'
import getDefaultOpts from './axios-opts'
import { v4 as uuidv4 } from 'uuid'

export async function getActions(userId, setActions) {
    const opts = getDefaultOpts()
    opts.data.query = 'query Query ($userInfoId: String!) {  userInfo(id: $userInfoId) {    actions { active category completedTimeline createdDate deletedDate name timesCompleted points timesSet    }}}'
    opts.data.variables = {userInfoId: userId}

    return axios.request(opts)
        .then(function (response) {
            console.log(`Retrieving Actions...`)
            setActions(response.data.data.userInfo.actions)
        })
}

export async function getTodayActions(userId, setActionsToday) {
    const opts = getDefaultOpts()
    opts.data.query = 'query Query ($userInfoId: String!) { userInfo(id: $userInfoId) { today { pointsSet, pointsComplete, actionsSet { name, category, points }, actionsComplete { name, category, points }, shmate } } }'
    opts.data.variables = {userInfoId: userId}

    return axios.request(opts)
        .then(async function (response) {
            const today = response.data.data.userInfo.today
            let actions = []
            let completed = []
            if(!today) {
                console.log("First log in of day... setting day.")
                await updateDay(userId, [], [], 0, 0)
            } else {
                actions = today.actionsSet.map(action => ({...action, completed: false}))
                completed = today.actionsComplete.map(action => ({...action, completed: true}))
            }
            actions = actions.concat(completed).map(action => ({...action, id: uuidv4()}))
            setActionsToday(actions)
            return(actions)
        })
}

export async function updateDay(userId, actionsSet, actionsComplete, pointsSet, pointsComplete) {
    const opts = getDefaultOpts()
    opts.data.query = 'mutation Mutation ($userInfoId: String!, $actionsSet: [ActionImplInput], $actionsComplete: [ActionImplInput], $pointsSet: Int, $pointsComplete: Int) { updateUserDay(id: $userInfoId, pointsSet: $pointsSet, pointsComplete: $pointsComplete, actionsSet: $actionsSet, actionsComplete: $actionsComplete) }'
    opts.data.variables = {
        userInfoId: userId,
        actionsSet,
        actionsComplete, 
        pointsSet,
        pointsComplete
    }

    return axios.request(opts)
        .then(function (response) {
            console.log('Day Updated!')
        })
}