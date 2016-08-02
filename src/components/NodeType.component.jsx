import React, { PropTypes } from 'react';
import invariant from 'invariant';

const NodeType = React.createClass({
    propTypes: {
        type: PropTypes.string.isRequired,
        component: PropTypes.func.isRequired,
    },
    render() {
        invariant(
            false,
            '<NodeType> elements are for DataFlow configuration only and should not be rendered'
        );
    },
});

export default NodeType;
