import React from 'react'

class Timer extends React.Component {
    getInitialState() {
        return {
            startTime: new Date().valueOf(),
            timer: 0
        };
    }

    componentDidMount() {
        this._interval = setInterval(this.forceUpdate.bind(this), 100)
    }

    componentWillUnmount() {
        this._interval && clearInterval(this._interval);
    }

    resetTimer() {
        this.setState({
            startTime: new Date().valueOf(),
            timer: 0
        });
    }

    getTime() {
        return this.state.timer;
    }

    render() {
        var time = (Date.now() - this.props.startTimestamp)/1000;
        return (
            <span className="timer">{time.toFixed(1)} сек.</span>
        )
    }
}

export default Timer;
