import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

function getColors(themes, name, reverse) {
	const theme = themes[name] || Object.values(themes).find(t => t.isDefault);

	if (!theme) {
		return null;
	} else if (!reverse) {
		return theme;
	}

	let {
		color,
		reverseColor,
		hoverColor,
		hoverReverseColor,
		selectedColor,
		selectedReverseColor,
	} = theme;

	// reverse the colors
	[color, reverseColor] = [reverseColor, color];
	[hoverColor, hoverReverseColor] = [hoverReverseColor, hoverColor];
	[selectedColor, selectedReverseColor] = [selectedReverseColor, selectedColor];

	return {
		color,
		reverseColor,
		hoverColor,
		hoverReverseColor,
		selectedColor,
		selectedReverseColor,
	};
}

function getHeaderBarBranding({ icon, headerBar, themes }) {
	const { theme, reverse = true } = headerBar;
	const colors = getColors(themes, theme, reverse);
	if (!colors) {
		return '';
	}

	const {
		color,
		reverseColor,
		hoverColor,
		hoverReverseColor,
	} = colors;

	const iconWidth = icon.width ? `${icon.width}px` : '2.2rem';
	const iconStyle = icon.source ?
		`.branding-headerBar .tc-header-bar-logo {
		    width: ${iconWidth};
		    background: url(${icon.source});
		    background-size: cover;
		    background-repeat: no-repeat;
		    margin: 0 10px;
		}
		.branding-headerBar .tc-header-bar-logo > svg {
			display: none;
		}`
		: ''
	;

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
		${iconStyle}
	`;
}

function getSidePanelBranding({ sidePanel, themes }) {
	const { theme, reverse = true } = sidePanel;
	const colors = getColors(themes, theme, reverse);
	if (!colors) {
		return '';
	}

	const {
		color,
		reverseColor,
		hoverColor,
		hoverReverseColor,
		selectedColor,
		selectedReverseColor,
	} = colors;
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
	icon: PropTypes.shape({
		source: PropTypes.string,
		width: PropTypes.string,
	}),
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
	icon: {},
	headerBar: {
		reverse: true,
	},
	sidePanel: {
		reverse: true,
	},
};

export default Branding;
