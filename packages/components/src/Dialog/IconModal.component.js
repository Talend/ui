import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../Icon';

function IconModal(props) {
	if (!props.icon) {
		return null;
	}

	return (
		<figure>
			<Icon name={props.icon} />
		</figure>
	);
}

IconModal.propTypes = {
	icon: PropTypes.string,
};

export default IconModal;
