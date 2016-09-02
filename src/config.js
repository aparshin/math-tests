import $ from 'jquery'

const Config = {
    _promise: null,
    _config: null,
    load: function() {
        if (!this._promise) {
            this._promise = $.getJSON('./config.json').then(function(config) {
                this._config = config;
            }.bind(this))
        }
        return this._promise;
    },

    get: function() {return this._config;}
}

export default Config;
