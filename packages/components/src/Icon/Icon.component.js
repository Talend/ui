import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import theme from './Icon.scss';

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
	const isRemote = name.startsWith('remote-');
	const imgSrc = name.replace('remote-', '').replace('src-', '');
	const [content, setContent] = React.useState();
	const ref = React.useRef();
	const isRemoteSVG = isRemote && content && content.includes('svg') && !content.includes('script');
	React.useEffect(() => {
		if (isRemote) {
			fetch(imgSrc, {
				headers: {
					Accept: 'image/svg+xml',
				},
			})
				.then(response => {
					if (response.status === 200 && response.ok) {
						response.text().then(data => {
							setContent(data);
						});
					} else {
						console.error(
							new Error(
								`IconResponseError: status=${response.status} ok=${response.ok} url=${imgSrc}`,
							),
						);
					}
				})
				.catch(error => {
					console.error('IconResponseError', imgSrc, error);
				});
		}
	}, [imgSrc, isRemote]);

	React.useEffect(() => {
		if (ref.current && isRemoteSVG) {
			// eslint-disable-next-line no-param-reassign
			ref.current.innerHTML = content;
		}
	}, [isRemoteSVG, ref, content]);
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

	let iconElement = (
		<svg name={name} className={classname} ref={ref} {...accessibility} {...props}>
			{isRemote ? undefined : <use xlinkHref={`#${name}`} />}
		</svg>
	);
	if (isRemote && content && !isRemoteSVG) {
		const classNames = classnames(theme['tc-icon'], 'tc-icon', className);
		iconElement = (
			<img
				alt="icon"
				src={name.replace('remote-', '')}
				className={classNames}
				aria-hidden
				{...props}
			/>
		);
	}
	if (!onClick) {
		return iconElement;
	}
	return (
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
