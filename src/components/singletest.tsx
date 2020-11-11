import React, { useState, useCallback, useRef } from 'react'

interface SingleTestProps {
    str: string,
    onAnswer: (answer: number) => void
}

export default function SingleTest({str, onAnswer}: SingleTestProps) {
    const [value, setValue] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    const onOk = useCallback(() => {
        if (value !== '') {
            onAnswer(parseInt(value));
            setValue('');
        }
        inputRef.current?.focus()
    }, [value, onAnswer])

    const onKeyPress = useCallback(e => {
        if (e.key === 'Enter') {
            onOk()
        }
    }, [onOk])

    const onChange = useCallback(e => {
        setValue(e.target.value)
    }, [])

    return (
        <span>
            <span>Сколько будет {str}:</span>
            <input
                autoFocus
                ref={inputRef}
                value={value}
                type="number"
                className="answer-input"
                onChange={onChange}
                onKeyPress={onKeyPress}
            />
            <button onClick={onOk}>OK</button>
        </span>
    )
}