import React from 'react'

import SingleTest from './singletest'
import SeriesStatus from './status'
import Timer from './timer'

class TestSeries extends React.Component{
    _getTestStatus(test) {
        if (typeof test.givenAnswer === 'undefined') {
            return 'undefined';
        }
        return test.givenAnswer === test.answer ? 'correct' : 'wrong';
    }

    render() {
        return (<div className="test-series-container">
            <SingleTest
                str = {this.props.tests[this.props.curIndex].str}
                onAnswer = {this.props.onAnswer}
            />
            <button className="series-reset" onClick={this.props.onReset}>Закончить</button>
            <Timer startTimestamp = {this.props.startTimestamp}/>
            <SeriesStatus  tests = {this.props.tests}/>
        </div>)
    }
}

export default TestSeries;
