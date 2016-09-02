import React from 'react'

const SingleTest = React.createClass({
    componentDidMount: function() {
        this._input.focus();
    },

    _sendAnswer: function() {
        this.props.onAnswer(parseInt(this._input.value));
        this._input.value = '';
        this._input.focus();
    },

    handleKeyPress: function(e) {
        if (e.key === 'Enter') {
            this._sendAnswer();
        }
    },

    render: function() {
        return (
            <span>
                <span>Сколько будет {this.props.str}:</span>
                <input
                    type="number"
                    className="answer-input"
                    onKeyPress={this.handleKeyPress}
                    ref={(c) => this._input = c}
                />
                <button onClick={this._sendAnswer}>OK</button>
            </span>
        )
    }
})

export default SingleTest;
