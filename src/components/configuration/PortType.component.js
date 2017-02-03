import React, { PropTypes } from 'react';
import invariant from 'invariant';

const PortType = React.createClass({
	propTypes: {
		type: PropTypes.string.isRequired,
        component: PropTypes.func.isRequired,
	},
	render(){
		invariant(
            false,
            '<PortType> elements are for DataFlow configuration only and should not be rendered'
        );
        return null;
	}
});

export default PortType;
