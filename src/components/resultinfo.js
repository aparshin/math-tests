import React from 'react'

class ResultInfo extends React.Component{
    render() {
        return (<div className="statistics">
            <div>Тестов: {this.props.count}</div>
            <div>Ошибок: {this.props.mistakes}</div>
            <div>Время: {this.props.time.toFixed(1)} сек.</div>
            <button onClick={this.props.onOk}>OK</button>
        </div>);
    }
};

export default ResultInfo;
