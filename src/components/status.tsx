import React from 'react'

import {MathTest} from '../reducers'

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
    const statuses = tests.map(t => {
        let isCorrect = t.answer === t.givenAnswer,
            op = isCorrect ? ' = ' : ' \u2260 ',
            title = t.str + op + t.givenAnswer,
            shouldBinded = t.givenAnswer !== undefined

        return (
            <svg
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

// class ExerciseStatus extends React.Component{
//     getStyle() {
//         if (this.props.test.givenAnswer === undefined) {
//             return {fill: '#DDD'};
//         } else {
//             let isCorrect = this.props.test.answer === this.props.test.givenAnswer;
//             return {fill: isCorrect ? 'green' : 'red'};
//         }
//     }

//     render() {
//         let t = this.props.test,
//             isCorrect = t.answer === t.givenAnswer,
//             op = isCorrect ? ' = ' : ' \u2260 ',
//             title = t.str + op + t.givenAnswer,
//             shouldBinded = t.givenAnswer !== undefined

//         return (
//             <svg
//                 data-tip = {shouldBinded ? title : ''}
//                 className="exercise-result"
//                 viewBox="0 0 16 16"
//             >
//                 <circle style = {this.getStyle()} cx="8" cy="8" r="6"/>
//             </svg>
//         )
//     }
// }

// class SeriesStatus extends React.Component{
//     render() {
//         var statuses = this.props.tests.map(function(test, i) {
//             return <ExerciseStatus test={test} key={i}/>
//         });

//         return <div>{statuses}</div>;
//     }
// }

// export default SeriesStatus;
