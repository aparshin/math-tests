import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Config, { ConfigInterface } from '../config'

import ResultInfo from '../components/resultinfo'
import TestSeries from '../components/testseries'
import Login      from '../components/login'

import TestSelection from './testselection'
import {TESTS_AS_ARRAY, TESTS_BY_NAME} from '../tests'

import { RootState } from '../reducers'

export default function App() {
    const dispatch = useDispatch()
    const mode = useSelector((state: RootState) => state.mode)

    const onSelectTest = useCallback(testName => {
        let count = (Config.get() as ConfigInterface).maxExercises,
            TestClass = TESTS_BY_NAME[testName],
            tests = [];

        for (let i = 0; i < count; i++) {
            let test = new TestClass();
            tests.push({
                str: test.getString(),
                answer: test.getAnswer()
            })
        }

        dispatch({
            type: 'START_TEST_SERIES',
            startTimestamp: Date.now(),
            testName,
            tests
        });
    }, [dispatch])

    const getContent = () => {
        switch (mode) {
            case 'SELECT_TEST':
                let testNames = TESTS_AS_ARRAY.map((testClass) => testClass.getTitle());
                return <TestSelection tests = {testNames} onSelect = {onSelectTest}/>;
            case 'RUN_TEST':
                return <TestSeries/>;
            case 'SHOW_RUN_INFO':
                return <ResultInfo/>;
            default:
                return null;
        }
    }

    return (<div>
        <Login/>
        {getContent()}
    </div>);
}