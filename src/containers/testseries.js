import {connect} from 'react-redux'
import TestSeries from '../components/testseries'

const TestSeriesContainer = connect(
    (state) => state.series,

    (dispatch) => {
        return {
            onAnswer: (answer) => {
                dispatch({
                    type: 'TEST_ANSWER',
                    timestamp: Date.now(),
                    answer
                })
            },
            onReset: () => {
                dispatch({
                    type: 'RESET_SERIES'
                })
            }
        }
    }
)(TestSeries);

export default TestSeriesContainer;
