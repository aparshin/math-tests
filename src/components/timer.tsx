import React, { useEffect, useState } from 'react'

interface TimerProperties {
    startTimestamp: number
}

export default function Timer({startTimestamp}: TimerProperties) {
    const [currentTime, setCurrentTime] = useState(startTimestamp)
    useEffect(() => {
        const intervalId = setInterval(() => setCurrentTime(Date.now()), 100)
        return () => clearInterval(intervalId)
    }, [])

    const passedSeconds = (currentTime - startTimestamp) / 1000 

    return (
        <span className="timer">{passedSeconds.toFixed(1)} сек.</span>
    )
}