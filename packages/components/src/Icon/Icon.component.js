import PropTypes from 'prop-types';
import React from 'react';
import invariant from 'invariant';
import classnames from 'classnames';

import theme from './Icon.scss';

export const FA_TRANSFORMS = {
	spin: 'fa-spin',
	'rotate-90': 'fa-rotate-90',
	'rotate-180': 'fa-rotate-180',
	'rotate-270': 'fa-rotate-270',
	'flip-horizontal': 'fa-flip-horizontal',
	'flip-vertical': 'fa-flip-vertical',
};

export const SVG_TRANSFORMS = {
	spin: theme.spin,
	'rotate-45': theme['rotate-45'],
	'rotate-90': theme['rotate-90'],
	'rotate-135': theme['rotate-135'],
	'rotate-180': theme['rotate-180'],
	'rotate-225': theme['rotate-225'],
	'rotate-270': theme['rotate-270'],
	'rotate-315': theme['rotate-315'],
	'flip-horizontal': theme['flip-horizontal'],
	'flip-vertical': theme['flip-vertical'],
};

export const TRANSFORMS = Object.keys(FA_TRANSFORMS);

/**
 * SVG implementation is inspired by
 * http://svgicons.sparkk.fr/
 * @param {object} props react props
 * @example
<Icon name="fa-bars"></Icon>
 */
function Icon({ className, name, title, transform, onClick }) {
	const accessibility = {
		focusable: 'false', // IE11
		'aria-hidden': 'true',
		title: title || null,
	};
	if (name.startsWith('fa-')) {
		const classes = classnames('fa', name, className, transform && FA_TRANSFORMS[transform]);
		return <i className={classes} {...accessibility} />;
	}
	if (name.startsWith('fa fa-') || name.startsWith('icon-')) {
		const classes = classnames(name, className, transform && FA_TRANSFORMS[transform]);
		return <i className={classes} {...accessibility} />;
	}
	if (onClick && name) {
		const classname = classnames(
			theme['tc-svg-icon'],
			'tc-svg-icon',
			className,
			SVG_TRANSFORMS[transform],
		);
		return (
			// eslint doesn't recognizes the xlinkHref mention
			// eslint-disable-next-line jsx-a11y/no-static-element-interactions
			<a xlinkHref="#" onClick={onClick} className={classnames('tc-svg-anchor', theme.link)}>
				<svg className={classname} {...accessibility}>
					<use xlinkHref={`#${name}`} />
				</svg>
			</a>
		);
	}
	if (name) {
		const classname = classnames(
			theme['tc-svg-icon'],
			'tc-svg-icon',
			className,
			SVG_TRANSFORMS[transform],
		);
		return (
			<svg className={classname} {...accessibility}>
				<use xlinkHref={`#${name}`} />
			</svg>
		);
	}
	invariant(true, 'no name provided');
}

Icon.displayName = 'Icon';

Icon.propTypes = {
	className: PropTypes.string,
	name: PropTypes.string.isRequired,
	title: PropTypes.string,
	transform: PropTypes.oneOf(TRANSFORMS),
	onClick: PropTypes.func,
};

export default Icon;
