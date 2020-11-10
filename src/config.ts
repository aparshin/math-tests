import $ from 'jquery'

let _promise: any = null
let _config: any = null

const Config = {
    load: function() {
        if (!_promise) {
            _promise = $.getJSON('./config.json').then(function(config: any) {
                _config = config;
            })
        }
        return _promise;
    },

    get: function() {return _config;}
}

export default Config;
