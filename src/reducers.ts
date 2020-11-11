interface MathTest {
    str: string,
    answer: number,
    givenAnswer?: number
}

interface MathSeries {
    curIndex: number,
    startTimestamp: number,
    finishTimestamp?: number,
    testName: string,
    tests: MathTest[]
}

export interface RootState {
    mode: string,
    username: string | null,
    series?: MathSeries,
    needSendResults: boolean
}

var assignGivenAnswer = (series: MathSeries, answer: number): MathSeries => {
    return {
        ...series,
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
    }
}

const initialState: RootState = {
    mode: 'SELECT_TEST',
    username: null,
    needSendResults: false
}

const reducer = (state: RootState = initialState, action: any): RootState => {
    switch (action.type) {
        case 'TEST_ANSWER':

            if (state.series == null) {
                return state
            }

            const newSeries = assignGivenAnswer(state.series, action.answer)
            if (newSeries.curIndex === newSeries.tests.length) {
                return Object.assign({}, state, {
                    mode: 'SHOW_RUN_INFO',
                    needSendResults: true,
                    series: {
                        ...newSeries, 
                        finishTimestamp: action.timestamp
                    }
                });
            } else {
                return {
                    ...state,
                    series: newSeries
                }
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