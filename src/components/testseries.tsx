import React, { useCallback } from 'react'
import ReactTooltip from 'react-tooltip'
import {observer} from 'mobx-react-lite'

import SingleTest from './singletest'
import SeriesStatus from './status'
import Timer from './timer'
import { useStore } from '../stores/Root'
import { useDispatch } from 'react-redux'

export default observer(function TestSeries() {
    const dispatch = useDispatch()
    const {seriesStore} = useStore()

    const onAnswer = useCallback(answer => {
        seriesStore.addTestAnswer(answer)
        if (seriesStore.isFinished) {
            dispatch({type: 'FINISH_TEST_SERIES'})
        }
    }, [dispatch, seriesStore])

    const onReset = useCallback(() => {
        dispatch({
            type: 'RESET_SERIES'
        })
    }, [dispatch])

    return (
        <div className="test-series-container">
            <SingleTest
                str = {seriesStore.tests[seriesStore.curIndex].str}
                onAnswer = {onAnswer}
            />
            <button className="series-reset" onClick={onReset}>Закончить</button>
            <Timer startTimestamp = {seriesStore.startTimestamp}/>
            <SeriesStatus  tests = {seriesStore.tests}/>
            <ReactTooltip place="bottom" type="dark" effect="solid"/>
        </div>
    )
})