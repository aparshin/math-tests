import React from 'react'

import ResultInfo from '../containers/resultinfo'
import TestSeries from '../containers/testseries'
import Login      from '../containers/login'

import TestSelection from './testselection'
import {TESTS_AS_ARRAY} from '../tests'

const App = React.createClass({
    renderContent: function() {
        switch (this.props.mode) {
            case 'SELECT_TEST':
                let testNames = TESTS_AS_ARRAY.map((testClass) => testClass.getTitle());
                return <TestSelection tests = {testNames} onSelect = {this.props.onSelectTest}/>;
            case 'RUN_TEST':
                return <TestSeries/>;
            case 'SHOW_RUN_INFO':
                return <ResultInfo/>;
        }
    },

    render: function() {
        let content = this.renderContent();
        return (<div>
            <Login/>
            {content}
        </div>);
    }
});

export default App;
