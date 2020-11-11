import React from 'react'

interface TestSelectionProps {
    tests: string[],
    onSelect: (name: string) => void
}

export default function TestSelection({tests, onSelect}: TestSelectionProps) {
    var testButtons = tests.map((test)=> {
        return <button
            className="test-select-item"
            onClick={() => onSelect(test)}
            key={test}>{test}
        </button>
    })

    return <div>{testButtons}</div>;
}