import React from 'react'

const Timer = React.createClass({
    getInitialState: function() {
        return {
            startTime: new Date().valueOf(),
            timer: 0
        };
    },

    componentDidMount: function() {
        this._interval = setInterval(this.forceUpdate.bind(this), 100)
    },

    componentWillUnmount: function() {
        this._interval && clearInterval(this._interval);
    },

    resetTimer: function() {
        this.setState({
            startTime: new Date().valueOf(),
            timer: 0
        });
    },

    getTime: function() {
        return this.state.timer;
    },

    render: function() {
        var time = (Date.now() - this.props.startTimestamp)/1000;
        return (
            <span className="timer">{time.toFixed(1)} сек.</span>
        )
    }
})

export default Timer;
