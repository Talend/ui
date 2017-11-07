import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

function getHeaderBarBranding({ headerBar, themes }) {
	const { theme, reverse = true } = headerBar;
	const colors = themes[theme];
	if (!colors) {
		return '';
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

function getSidePanelBranding({ sidePanel, themes }) {
	const { theme, reverse = true } = sidePanel;
	const colors = themes[theme];
	if (!colors) {
		return '';
	}

	let {
		color,
		reverseColor,
		hoverColor,
		hoverReverseColor,
		selectedColor,
		selectedReverseColor,
	} = colors;
	if (reverse) {
		[color, reverseColor] = [reverseColor, color];
		[hoverColor, hoverReverseColor] = [hoverReverseColor, hoverColor];
		[selectedColor, selectedReverseColor] = [selectedReverseColor, selectedColor];
	}

	return `
		.branding-sidePanel ul,
		.tc-layout-two-columns-left {
			color: ${color};
			background-color: ${reverseColor};
		}
		.branding-sidePanel .tc-side-panel-list-item:hover {
			color: ${hoverColor};
			background-color: ${hoverReverseColor};
		}
		.branding-sidePanel .tc-side-panel-list-item.active {
			color: ${selectedColor};
			background-color: ${selectedReverseColor};
		}
		.branding-sidePanel .toggle-btn .btn.btn-link:hover {
			color: ${hoverColor};
		}
		.branding-sidePanel .toggle-btn:hover {
			color: ${color};
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
		theme: PropTypes.string,
	}),
	sidePanel: PropTypes.shape({
		reverse: PropTypes.bool,
		theme: PropTypes.string,
	}),
	themes: PropTypes.object,
};
Branding.defaultProps = {
	headerBar: {
		reverse: true,
		theme: 'primaryDarker',
	},
	sidePanel: {
		reverse: true,
		theme: 'primary',
	},
};

export default Branding;
