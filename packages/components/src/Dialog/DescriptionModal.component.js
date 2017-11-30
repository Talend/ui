import PropTypes from 'prop-types';
import React from 'react';

function getMark(highlight) {
	if (!highlight) {
		return null;
	}

	return <mark>{highlight}</mark>;
}

function DescriptionModal(props) {
	if (!props.description) {
		return null;
	}

	return (
		<p>
			{props.description.text} {getMark(props.description.highlight)}
		</p>
	);
}

DescriptionModal.propTypes = {
	description: PropTypes.shape({
		text: PropTypes.string.isRequired,
		highlight: PropTypes.string,
	}),
};

export default DescriptionModal;
