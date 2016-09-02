import React from 'react'
import Tooltipster from 'tooltipster'
import $ from 'jquery'

Tooltipster($);

const ExerciseStatus = React.createClass({
    getStyle: function() {
        if (this.props.test.givenAnswer === undefined) {
            return {fill: '#DDD'};
        } else {
            let isCorrect = this.props.test.answer === this.props.test.givenAnswer;
            return {fill: isCorrect ? 'green' : 'red'};
        }
    },

    bindTooltip: function() {
        let isBinded = $(this._el).hasClass('tooltipstered'),
            shouldBinded = this.props.test.givenAnswer !== undefined;

        if (shouldBinded && !isBinded) {
            $(this._el).tooltipster({
                delay: 50,
                animationDuration: 50,
                side: 'bottom',
                theme: 'tooltipster-light'
            });
        }

        if (!shouldBinded && isBinded) {
            $(this._el).tooltipster('destroy');
        }
    },

    componentDidMount: function() {
        this.bindTooltip();
    },

    componentDidUpdate: function() {
        this.bindTooltip();
    },

    render: function() {
        let t = this.props.test,
            isCorrect = t.answer === t.givenAnswer,
            op = isCorrect ? ' = ' : ' \u2260 ',
            title = t.str + op + t.givenAnswer;

        return (
            <svg
                ref={(c) => this._el = c}
                title = {title}
                className="exercise-result"
                viewBox="0 0 16 16"
            >
                <circle style = {this.getStyle()} cx="8" cy="8" r="6"/>
            </svg>
        )
    }
})

const SeriesStatus = React.createClass({
    render: function() {
        var statuses = this.props.tests.map(function(test, i) {
            return <ExerciseStatus test={test} key={i}/>
        });

        return <div>{statuses}</div>;
    }
})

export default SeriesStatus;
