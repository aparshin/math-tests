import React from 'react'

class TestSelection extends React.Component{
    render() {
        var tests = this.props.tests.map((test)=> {
            return <button
                className="test-select-item"
                onClick={this.props.onSelect.bind(null, test)}
                key={test}>{test}
            </button>
        })

        return <div>{tests}</div>;
    }
}

export default TestSelection;
