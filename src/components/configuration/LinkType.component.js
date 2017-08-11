import PropTypes from 'prop-types';
import React from 'react';
import invariant from 'invariant';

class LinkType extends React.Component {
	static displayName = 'LinkType';
	static propTypes = {
		type: PropTypes.string.isRequired,
		component: PropTypes.func.isRequired,
	}

	render() {
		invariant(
		false,
		'<LinkType> elements are for DataFlow configuration only and should not be rendered',
	);
		return null;
	}

}

export default LinkType;
