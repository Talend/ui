import React from 'react';


const NodeText = React.createClass({
    render() {
        const {x, y, text} = this.props;
        return (
          <text className="node-element__text" x={x} y={y + 70}>
            {text}
          </text>
        );
    },
});

export default NodeText;
