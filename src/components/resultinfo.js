import React from 'react'

const ResultInfo = React.createClass({
    render: function() {
        return (<div className="statistics">
            <div>Тестов: {this.props.count}</div>
            <div>Ошибок: {this.props.mistakes}</div>
            <div>Время: {this.props.time.toFixed(1)} сек.</div>
            <button onClick={this.props.onOk}>OK</button>
        </div>);
    }
});

export default ResultInfo;
