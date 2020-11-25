import React from 'react'

import {MathTest} from '../stores/Series'

interface SeriesStatusProps {
    tests: MathTest[]
}

const getStyle = (test: MathTest) => {
    if (test.givenAnswer === undefined) {
        return {fill: '#DDD'};
    } else {
        let isCorrect = test.answer === test.givenAnswer;
        return {fill: isCorrect ? 'green' : 'red'};
    }
}

export default function SeriesStatus({tests}: SeriesStatusProps) {
    const statuses = tests.map((t, idx) => {
        let isCorrect = t.answer === t.givenAnswer,
            op = isCorrect ? ' = ' : ' \u2260 ',
            title = t.str + op + t.givenAnswer,
            shouldBinded = t.givenAnswer !== undefined

        return (
            <svg
                key={idx}
                data-tip = {shouldBinded ? title : ''}
                className="exercise-result"
                viewBox="0 0 16 16"
            >
                <circle style = {getStyle(t)} cx="8" cy="8" r="6"/>
            </svg>
        )
    })
    return (
        <div> {statuses} </div>
    )
}