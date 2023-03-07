import { container } from "../container";

export default function getDefaultOpts() {
    return {
        method: 'POST',
        url: container.url,
        headers: {'content-type': 'application/json'},
        data: {
            query: '',
            variables: {}
        }
    }
}
