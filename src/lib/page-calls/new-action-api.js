import axios from 'axios'
import getDefaultOpts from './axios-opts'

export default function getInfoForNewActionPage(userId, setUserInfo) {
    const opts = getDefaultOpts()
    opts.data.query = 'query Query ($userInfoId: String!) {  userInfo(id: $userInfoId) {    actions { active category completedTimeline createdDate deletedDate name timesCompleted points timesSet    }    currentBalanceProfile { body mind    }    day { actionsComplete {   points   name } date pointsComplete pointsSet    }    dayReports { actionsComplete {   name   points } date pointsComplete pointsSet    }    id    name    preferences { intensitySchedule {   friday   monday   saturday   thursday   sunday   tuesday   wednesday }    }    week { startDate pointsSet pointsComplete actionsComplete {   name   points } endDate    }    weekReports { actionsComplete {   points   name } endDate pointsComplete pointsSet startDate    }  }}'
    opts.data.variables = {userInfoId: 'abc'}

    return axios.request(opts)
        .then(function (response) {
            console.log(response.data)
            setUserInfo(response.data)
        })
}