var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var moment = require('moment');

var StatApp = React.createClass({
    getInitialState: function() {
        return {results: []};
    },

    componentDidMount: function() {
        $.getJSON(this.props.config.baseUrl + 'stat').then(function(res) {
            this.setState({results: res});
        }.bind(this))
    },

    render: function() {
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
});

$.getJSON('./config.json').then((config) => {
    ReactDOM.render(<StatApp config={config}/>, document.getElementById('root'));
})
