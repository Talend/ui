import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import theme from './Icon.scss';
import IconsProvider from '../IconsProvider';

const FA_TRANSFORMS = {
	spin: 'fa-spin',
	'rotate-90': 'fa-rotate-90',
	'rotate-180': 'fa-rotate-180',
	'rotate-270': 'fa-rotate-270',
	'flip-horizontal': 'fa-flip-horizontal',
	'flip-vertical': 'fa-flip-vertical',
};

const SVG_TRANSFORMS = {
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

const TRANSFORMS = Object.keys(SVG_TRANSFORMS);

/**
 * SVG implementation is inspired by
 * http://svgicons.sparkk.fr/
 * @param {object} props react props
 * @example
 <Icon name="fa-bars"></Icon>
 */
function Icon({ className, name, title, transform, onClick, ...props }) {
	const containerRef = React.useRef(null);
	React.useEffect(() => {
		if (containerRef && containerRef.current && !name.startsWith('remote-')) {
			IconsProvider.injectIcon(name, containerRef.current);
		}
	}, [containerRef, name]);
	React.useEffect(() => {
		if (name.startsWith('remote-')) {
			fetch(name.replace('remote-', ''))
				.then(response => {
					if (response.status === 200 && response.ok) {
						response.text().then(content => {
							if (content.startsWith('<svg')) {
								if (containerRef && containerRef.current) {
									containerRef.current.appendChild(content);
								}
							}
						});
					}
					console.error(new Error(`IconResponseError: ${response.status}`));
				})
				.catch(error => {
					console.error(error);
				});
		}
	}, [name]);
	const accessibility = {
		focusable: 'false', // IE11
		'aria-hidden': 'true',
		title: title || null,
	};
	if (name.startsWith('src-')) {
		const classNames = classnames(theme['tc-icon'], 'tc-icon', className);
		return <img className={classNames} src={name.substring(4)} alt="" aria-hidden {...props} />;
	}
	if (name.startsWith('fa-')) {
		const classes = classnames('fa', name, className, transform && FA_TRANSFORMS[transform]);
		return <i className={classes} {...accessibility} {...props} />;
	}
	if (name.startsWith('fa fa-') || name.startsWith('icon-')) {
		const classes = classnames(name, className, transform && FA_TRANSFORMS[transform]);
		return <i className={classes} {...accessibility} {...props} />;
	}
	if (!name) {
		return <div className="alert alert-danger">Icon: no name provided</div>;
	}
	const classname = classnames(
		theme['tc-svg-icon'],
		'tc-svg-icon',
		className,
		SVG_TRANSFORMS[transform],
	);
	const iconElement = (
		<svg name={name} className={classname} ref={containerRef} {...accessibility} {...props} />
	);

	if (!onClick) {
		return iconElement;
	}
	return (
		// eslint doesn't recognizes the xlinkHref mention
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions
		<button onClick={onClick} className={classnames('tc-svg-anchor', theme.link)}>
			{iconElement}
		</button>
	);
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
