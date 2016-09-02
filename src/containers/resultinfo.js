import {connect} from 'react-redux'
import ResultInfoComponent from '../components/resultinfo'

const ResultInfoContainer = connect(
    (state) => {
        let s = state.series,
            time = (s.finishTimestamp - s.startTimestamp)/1000,
            mistakes = s.tests.reduce(
                (count, test) => count + (test.answer !== test.givenAnswer),
                0
            );
        return {
            count: s.tests.length,
            mistakes,
            time
        }
    },

    (dispatch) => {
        return {
            onOk: () => {
                dispatch({
                    type: 'INFO_PRESS_OK'
                })
            }
        }
    }
)(ResultInfoComponent);

export default ResultInfoContainer;
