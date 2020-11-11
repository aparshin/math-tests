import React, { useCallback } from 'react'
import ReactTooltip from 'react-tooltip'

import SingleTest from './singletest'
import SeriesStatus from './status'
import Timer from './timer'
import { useDispatch, useSelector } from 'react-redux'

import {RootState} from '../reducers'

export default function TestSeries() {
    const dispatch = useDispatch()
    const series = useSelector((state: RootState) => state.series)

    const onAnswer = useCallback(answer => {
        dispatch({
            type: 'TEST_ANSWER',
            timestamp: Date.now(),
            answer
        })
    }, [dispatch])

    const onReset = useCallback(() => {
        dispatch({
            type: 'RESET_SERIES'
        })
    }, [dispatch])

    if (!series) {
        return null
    }

    return (
        <div className="test-series-container">
            <SingleTest
                str = {series.tests[series.curIndex].str}
                onAnswer = {onAnswer}
            />
            <button className="series-reset" onClick={onReset}>Закончить</button>
            <Timer startTimestamp = {series.startTimestamp}/>
            <SeriesStatus  tests = {series.tests}/>
            <ReactTooltip place="bottom" type="dark" effect="solid"/>
        </div>
    )
}