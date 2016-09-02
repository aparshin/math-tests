import Config from './config'

var assignGivenAnswer = (series, answer) => {
    return {
        series: Object.assign({}, series, {
            curIndex: series.curIndex + 1,
            tests: series.tests.map((res, i) => {
                if (i === series.curIndex) {
                    return Object.assign({}, res, {
                        givenAnswer: answer
                    });
                } else {
                    return res;
                }
            })
        })
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'TEST_ANSWER':
            state = Object.assign({}, state, assignGivenAnswer(state.series, action.answer));
            if (state.series.curIndex === state.series.tests.length) {
                return Object.assign({}, state, {
                    mode: 'SHOW_RUN_INFO',
                    needSendResults: true,
                    series: Object.assign({}, state.series, {
                        finishTimestamp: action.timestamp
                    })
                });
            } else {
                return state;
            }
        case 'START_TEST_SERIES':
            return Object.assign({}, state, {
                mode: 'RUN_TEST',
                series: {
                    curIndex: 0,
                    startTimestamp: action.startTimestamp,
                    testName: action.testName,
                    tests: action.tests
                }
            })
        case 'INFO_PRESS_OK':
        case 'RESET_SERIES':
            return Object.assign({}, state, {
                mode: 'SELECT_TEST'
            })
        case 'USER_LOGIN':
            return Object.assign({}, state, {
                username: action.username
            })
        case 'USER_LOGOUT':
            return Object.assign({}, state, {
                username: null
            })
        case 'SENT_RESULTS':
            return Object.assign({}, state, {
                needSendResults: false
            })

        default:
            return state;
    }
};

export default reducer;

/* const reducer = (state, action) => {
    if (!state) {
        state = {curIndex: 0, results: new Array(Config.get().maxExercises)};
    }
    switch (action.type) {
        case 'SET_RESULT':
            return Object.assign({}, state, {
                curIndex: state.curIndex + 1,
                results: state.results.map((res, i) => {
                    if (i === action.index) {
                        return {result: action.result};
                    } else {
                        return res;
                    }
                })
        default:
            return state;
    }
} */
