import React from 'react'

class SingleTest extends React.Component{
    componentDidMount() {
        this._input.focus();
    }

    _sendAnswer() {
        this.props.onAnswer(parseInt(this._input.value));
        this._input.value = '';
        this._input.focus();
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this._sendAnswer();
        }
    }

    render() {
        return (
            <span>
                <span>Сколько будет {this.props.str}:</span>
                <input
                    type="number"
                    className="answer-input"
                    onKeyPress={this.handleKeyPress.bind(this)}
                    ref={(c) => this._input = c}
                />
                <button onClick={this._sendAnswer.bind(this)}>OK</button>
            </span>
        )
    }
}

export default SingleTest;
