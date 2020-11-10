import React from 'react'

import ResultInfo from '../containers/resultinfo'
import TestSeries from '../containers/testseries'
import Login      from '../components/login'

import TestSelection from './testselection'
import {TESTS_AS_ARRAY} from '../tests'

class App extends React.Component{
    renderContent() {
        switch (this.props.mode) {
            case 'SELECT_TEST':
                let testNames = TESTS_AS_ARRAY.map((testClass) => testClass.getTitle());
                return <TestSelection tests = {testNames} onSelect = {this.props.onSelectTest}/>;
            case 'RUN_TEST':
                return <TestSeries/>;
            case 'SHOW_RUN_INFO':
                return <ResultInfo/>;
            default:
                return null;
        }
    }

    render() {
        let content = this.renderContent();
        return (<div>
            <Login/>
            {content}
        </div>);
    }
};

export default App;
