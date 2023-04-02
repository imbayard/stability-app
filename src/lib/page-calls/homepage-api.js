import axios from 'axios'
import getDefaultOpts from './axios-opts'

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
    opts.data.query = 'query Query ($userInfoId: String!) { userInfo(id: $userInfoId) { actions { active category name points } } }'
    opts.data.variables = {userInfoId: userId}

    return axios.request(opts)
        .then(function (response) {
            const actions = response.data.data.userInfo.actions.filter(action => action.active)
            setActionsToday(actions)
            return(actions)
        })
}