import PropTypes from 'prop-types';
import React from 'react';
import invariant from 'invariant';

class PortType extends React.Component {
	static displayName = 'PortType';
	static propTypes = {
		type: PropTypes.string.isRequired,
		component: PropTypes.func.isRequired,
	}

	render() {
		invariant(
			false,
			'<PortType> elements are for DataFlow configuration only and should not be rendered',
		);
		return null;
	}
}

export default PortType;
