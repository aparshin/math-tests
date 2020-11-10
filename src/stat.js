import React from 'react'
import './stat.css'
var $ = require('jquery');
var moment = require('moment');


export default class StatApp extends React.Component{
    state = {results: []}

    componentDidMount() {
        $.getJSON(this.props.config.baseUrl + 'stat').then(function(res) {
            this.setState({results: res});
        }.bind(this))
    }

    render() {
        var rows = this.state.results.map((seriesResult, i) => {
            var mistakes = seriesResult.tests.reduce((count, res) => count + (res.answer !== res.givenAnswer), 0),
                time = (seriesResult.finishTimestamp - seriesResult.startTimestamp)/1000;

            return (<tr key={i}>
                <td>{mistakes}/{seriesResult.tests.length}</td>
                <td>{time.toFixed(1)}</td>
                <td>{moment(seriesResult.saveTime).format('DD.MM.YY HH:mm:ss')}</td>
                <td>{seriesResult.user || ''}</td>
                <td>{seriesResult.testName}</td>
            </tr>);
        }).reverse();
        return (<table>
            <thead><tr>
                <th>Ошибки</th>
                <th>Время (сек.)</th>
                <th>Дата</th>
                <th>Пользователь</th>
                <th>Тест</th>
            </tr></thead>
            <tbody>{rows}</tbody>
        </table>);
    }
};