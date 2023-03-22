import {Amplify, Auth} from 'aws-amplify'
import awsconfig from '../aws-exports.js'

const url = 'https://crvqrb6n94.execute-api.us-east-1.amazonaws.com/dev/graphql'
const local = 'http://localhost:3000/dev/graphql'

Amplify.configure(awsconfig)

export const container = {
    url,
    local,
    auth: Auth
}