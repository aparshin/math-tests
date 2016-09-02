import {connect} from 'react-redux'

import AppComponent from '../components/app'
import {TESTS_BY_NAME} from '../tests'
import Config from '../config'

const App = connect(
    (state) => {return {mode: state.mode}},
    (dispatch) => {
        return {
            onSelectTest: function(testName) {
                let count = Config.get().maxExercises,
                    TestClass = TESTS_BY_NAME[testName],
                    tests = [];

                for (let i = 0; i < count; i++) {
                    let test = new TestClass();
                    tests.push({
                        str: test.getString(),
                        answer: test.getAnswer()
                    })
                }

                dispatch({
                    type: 'START_TEST_SERIES',
                    startTimestamp: Date.now(),
                    testName,
                    tests
                });
            },

            onInfoOk: function() {
                dispatch({
                    type: 'INFO_PRESS_OK'
                })
            }
        }
    }
)(AppComponent)

export default App;
