export interface RootState {
    mode: string,
    needSendResults: boolean
}

const initialState: RootState = {
    mode: 'SELECT_TEST',
    needSendResults: false
}

const reducer = (state: RootState = initialState, action: any): RootState => {
    switch (action.type) {
        case 'FINISH_TEST_SERIES':
            return {
                ...state,
                mode: 'SHOW_RUN_INFO',
                needSendResults: true
            }

        case 'START_TEST_SERIES':
            return Object.assign({}, state, {
                mode: 'RUN_TEST'
            })

        case 'INFO_PRESS_OK':
        case 'RESET_SERIES':
            return Object.assign({}, state, {
                mode: 'SELECT_TEST'
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