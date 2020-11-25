import React, { useState, useEffect } from 'react'
import './stat.css'
import axios from 'axios'
import moment from 'moment';

import {useStore} from './stores/Root'

import {Series} from './stores/Series'

interface ServerResult extends Series {
    user?: string,
    saveTime: number
}

export default function StatApp () {
    const [results, setResults] = useState<ServerResult[]>([])

    const {configStore} = useStore()

    useEffect(() => {
        axios.get<ServerResult[]>(configStore.baseUrl + 'stat').then(response => {
            setResults(response.data);
        })
    }, [configStore.baseUrl])

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