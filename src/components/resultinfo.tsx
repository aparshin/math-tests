import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux';

import { useStore } from '../stores/Root';

export default function ResultInfo() {
    const dispatch = useDispatch()
    const {seriesStore} = useStore()

    const onOk = useCallback(() => {
        dispatch({ type: 'INFO_PRESS_OK' })
    }, [dispatch])


    if (!seriesStore.isFinished) {
        return null
    }

    let time = (seriesStore.finishTimestamp - seriesStore.startTimestamp) / 1000,
        mistakes = seriesStore.tests.reduce(
            (count, test) => count + Number(test.answer !== test.givenAnswer),
            0
        ),
        count = seriesStore.tests.length

    return (
        <div className="statistics">
            <div>Тестов: {count}</div>
            <div>Ошибок: {mistakes}</div>
            <div>Время: {time.toFixed(1)} сек.</div>
            <button onClick={onOk}>OK</button>
        </div>
    );
}