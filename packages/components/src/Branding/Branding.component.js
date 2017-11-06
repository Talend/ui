import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

function getHeaderBarBranding({ headerBar, profiles }) {
	const { profile, reverse = true } = headerBar;
	const colors = profiles[profile];
	if (!colors) {
		return null;
	}

	let { color, reverseColor, hoverColor, hoverReverseColor } = colors;
	if (reverse) {
		[color, reverseColor] = [reverseColor, color];
		[hoverColor, hoverReverseColor] = [hoverReverseColor, hoverColor];
	}

	return `
		.branding-headerBar {
			color: ${color};
			background-color: ${reverseColor};
		}
		.branding-headerBar .btn.btn-link {
			color: ${color};
		}
		.branding-headerBar .btn.btn-link:hover,
		.branding-headerBar .dropdown.open .btn.btn-link{
			color: ${hoverColor};
			background-color: ${hoverReverseColor};
		}
		.branding-headerBar .dropdown .caret {
			border-top-color: ${color};
            border-right-color: ${color};
		}
	`;
}

function getSidePanelBranding({ sidePanel, profiles }) {
	const { profile, reverse = true } = sidePanel;
	const colors = profiles[profile];
	if (!colors) {
		return null;
	}

	let {
		color,
		reverseColor,
		hoverColor,
		hoverReverseColor,
		selectedColor,
		selectedReverseColor
	} = colors;
	if (reverse) {
		[color, reverseColor] = [reverseColor, color];
		[hoverColor, hoverReverseColor] = [hoverReverseColor, hoverColor];
		[selectedColor, selectedReverseColor] = [selectedReverseColor, selectedColor];
	}

	return `
		.branding-sidePanel ul {
			color: ${color};
			background-color: ${reverseColor};
		}
		.branding-sidePanel li:hover {
			color: ${hoverColor};
			background-color: ${hoverReverseColor};
		}
		.branding-sidePanel li.active {
			color: ${selectedColor};
			background-color: ${selectedReverseColor};
		}
	`;
}

function Branding(props) {
	return (
		<Helmet>
			<style>
				{
					getHeaderBarBranding(props)
						.concat(getSidePanelBranding(props))
				}
			</style>
		</Helmet>
	);
}

Branding.propTypes = {
	headerBar: PropTypes.shape({
		reverse: PropTypes.bool,
		profile: PropTypes.string,
	}),
	sidePanel: PropTypes.shape({
		reverse: PropTypes.bool,
		profile: PropTypes.string,
	}),
	profiles: PropTypes.object,
};
Branding.defaultProps = {
	headerBar: {
		reverse: true,
		profile: 'primaryDarker',
	},
	sidePanel: {
		reverse: true,
		profile: 'primary',
	},
};

export default Branding;
