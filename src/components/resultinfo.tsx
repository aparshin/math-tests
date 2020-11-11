import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../reducers'

export default function ResultInfo() {
    const dispatch = useDispatch()
    const s = useSelector((state: RootState) => state.series)

    const onOk = useCallback(() => {
        dispatch({ type: 'INFO_PRESS_OK' })
    }, [dispatch])


    if (!s || !s.finishTimestamp) {
        return null
    }

    let time = (s.finishTimestamp - s.startTimestamp) / 1000,
        mistakes = s.tests.reduce(
            (count, test) => count + Number(test.answer !== test.givenAnswer),
            0
        ),
        count = s.tests.length

    return (
        <div className="statistics">
            <div>Тестов: {count}</div>
            <div>Ошибок: {mistakes}</div>
            <div>Время: {time.toFixed(1)} сек.</div>
            <button onClick={onOk}>OK</button>
        </div>
    );
}