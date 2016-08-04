import React, { PropTypes } from 'react';
import invariant from 'invariant';

const LinkType = React.createClass({
    propTypes: {
        type: PropTypes.string.isRequired,
        component: PropTypes.func.isRequired,
    },
    render() {
        invariant(
            false,
            '<LinkType> elements are for DataFlow configuration only and should not be rendered'
        );
        return null;
    },
});

export default LinkType;
