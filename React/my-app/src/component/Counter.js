import React from 'react'

class Counter extends React.Component {
    state = { num: 10 };
    render() {
        return <div>
            <button>+</button>
            {this.state.num}
            <button>-</button>
        </div>;

    }
}
export default Counter;