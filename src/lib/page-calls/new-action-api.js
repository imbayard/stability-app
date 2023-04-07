import axios from 'axios'
import getDefaultOpts from './axios-opts'

export async function getInfoForNewActionPage(userId, setUserInfo) {
    const opts = getDefaultOpts()
    opts.data.query = 'query Query ($userInfoId: String!) {  userInfo(id: $userInfoId) {    actions { active category completedTimeline createdDate deletedDate name timesCompleted points timesSet    }    currentBalanceProfile { body mind    }    today { actionsComplete {   points   name } date pointsComplete pointsSet    }    dayReports { actionsComplete {   name   points } date pointsComplete pointsSet    }    id    name    preferences { intensitySchedule {   friday   monday   saturday   thursday   sunday   tuesday   wednesday }    }    week { startDate pointsSet pointsComplete actionsComplete {   name   points } endDate    }    weekReports { actionsComplete {   points   name } endDate pointsComplete pointsSet startDate    }  }}'
    opts.data.variables = {userInfoId: userId}

    return axios.request(opts)
        .then(function (response) {
            console.log(response.data)
            setUserInfo(response.data)
        })
}

export async function createNewAction(userId, action) {
    const opts = getDefaultOpts()
    opts.data.query = 'mutation Mutation($userId: String!, $action: ActionInput!) { createNewAction(userId: $userId, action: $action) }'
    console.log(`Creating new action for ${userId}`)
    opts.data.variables = {userId, action}
    return axios.request(opts)
        .then(function (response) {
            console.log(response.data)
        }).catch(function(error) {
            console.log(error)
        })
}