import axios, {AxiosResponse} from 'axios'

interface ConfigInterface {
    maxExersices: number,
    baseUrl: string
}

let _promise: Promise<AxiosResponse<ConfigInterface>> | null = null
let _config: ConfigInterface | null = null

const Config = {
    load: function() {
        if (!_promise) {
            _promise = axios.get<ConfigInterface>('./config.json')
            _promise.then(response => {
                _config = response.data
            })
        }
        return _promise;
    },

    get: function() {return _config;}
}

export default Config;
