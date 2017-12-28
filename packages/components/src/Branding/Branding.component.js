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

function getHeaderBarBranding({ logo, headerBar, themes }) {
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

	const iconWidth = logo.width ? `${logo.width}px` : '2.2rem';
	const iconStyle = logo.source ?
		`.branding-headerBar .tc-header-bar-logo {
		    width: ${iconWidth};
		    background: url('${logo.source}');
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

const defaultAnimationStyle = `
    @keyframes pulse {
        0% {
            transform: scale3d(1, 1, 1);
        }
        50% {
            transform: scale3d(1.05, 1.05, 1.05);
        }
        100% {
            transform: scale3d(1, 1, 1);
        }
    }
`;

const defaultLoadingStyle = `
	animation-name: pulse;
	animation-duration: 1s;
	animation-fill-mode: both;
	animation-iteration-count: infinite;
`;

function getLoadingBranding({ loading = {} }) {
	const { source, size = 70 } = loading;
	let { animationStyle, loadingStyle } = loading;

	if (!source) {
		return '';
	}
	if (!loadingStyle) {
		animationStyle = defaultAnimationStyle;
		loadingStyle = defaultLoadingStyle;
	}

	// TODO : WARNING SECURITY ISSUES
	return `
		${animationStyle}
		.branding-loader {
			width: ${size}px;
			height: ${size}px;
			position: relative;
		}
		.branding-loader > * {
			display: none;
		}
		.branding-loader:before {
			background: url(${source}) no-repeat;
			content: '';
			position: absolute;
			background-size: ${size}px ${size}px;
			width: ${size}px;
			height: ${size}px;
			${loadingStyle};
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
						.concat(getLoadingBranding(props))
				}
			</style>
		</Helmet>
	);
}

Branding.propTypes = {
	loading: PropTypes.shape({
		source: PropTypes.string,
		style: PropTypes.string,
	}),
	logo: PropTypes.shape({
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
	logo: {},
	headerBar: {
		reverse: true,
	},
	sidePanel: {
		reverse: true,
	},
};

export default Branding;
