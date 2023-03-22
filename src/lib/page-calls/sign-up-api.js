import axios from 'axios'
import getDefaultOpts from './axios-opts'

export async function createNewUser(email, userId) {
    const opts = getDefaultOpts()
    opts.data.query = 'mutation Mutation ($email: String!, $userId: String!) { createNewUser(email: $email, userId: $userId) }'
    opts.data.variables = {email, userId}

    return axios.request(opts)
        .then(function (response) {
            console.log(response.data)
        })
}