import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';

import icons from '../../icons';

function isRequired() {
	throw Error('Icon name is mandatory');
}

// TODO https://medium.com/@allalmohamedlamine/react-best-way-of-importing-svg-the-how-and-why-f7c968272dd9
export default function Icon({ name = isRequired(), ...rest }) {
	if (!Object.keys(icons).find(iconName => iconName === name)) {
		return null;
	}
	return <SVG src={icons[name]} {...rest} />;
}

Icon.propTypes = {
	name: PropTypes.string.isRequired,
};
