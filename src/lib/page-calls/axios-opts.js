import { container } from "../container";
import { secrets } from '../../secrets'

export default function getDefaultOpts() {
    return {
        method: 'POST',
        url: container.local,
        headers: {'content-type': 'application/json', 'x-api-key': secrets.key},
        data: {
            query: '',
            variables: {}
        }
    }
}
