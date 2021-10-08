import React from 'react';
import PropTypes from 'prop-types';

function ComponentOverlay(props) {
	return <div>Component overlay with {props.customProps}</div>;
}

ComponentOverlay.propTypes = {
	customProps: PropTypes.string,
};

export default ComponentOverlay;
