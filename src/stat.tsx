import React, { useState, useEffect } from 'react'
import './stat.css'
import axios from 'axios'
import moment from 'moment';

import {ConfigInterface} from './config'

import {MathSeries} from './reducers'

interface StatAppProps {
    config: ConfigInterface
}

interface ServerResult extends MathSeries {
    user?: string,
    saveTime: number,
    finishTimestamp: number
}

export default function StatApp ({config}: StatAppProps) {
    const [results, setResults] = useState<ServerResult[]>([])

    useEffect(() => {
        axios.get<ServerResult[]>(config.baseUrl + 'stat').then(response => {
            setResults(response.data);
        })
    }, [config.baseUrl])

    var rows = results.map((seriesResult, i) => {
        var mistakes = seriesResult.tests.reduce((count, res) => count + Number(res.answer !== res.givenAnswer), 0),
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