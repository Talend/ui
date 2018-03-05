import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon';
import theme from './Skeleton.scss';

/**
 * This component show some skeleton stuff
 * @param {object} props the react props
 * @param {string} props.size the wanted size
 * @param {string} props.type the type of skeleton
 * @param {number} props.width width to override size's width
 * @param {number} props.height height to override size's height
 * @param {string} props.className classes to apply on skeleton
 */
function Skeleton({ type, size, width, height, name, className }) {
	const classes = classnames(
		theme['tc-skeleton'],
		theme[`tc-skeleton-${type}`],
		theme[`tc-skeleton-${type}-${size}`],
		'tc-skeleton',
		`tc-skeleton-${type}`,
		`tc-skeleton-${type}-${size}`,
		className,
	);

	if (type === 'icon') {
		return <Icon className={classes} name={name} />;
	}
	return <span style={{ width, height }} className={classes} />;
}

Skeleton.SKELETON_TYPES = {
	icon: 'icon',
	text: 'text',
	button: 'button',
	circle: 'circle',
};

Skeleton.SKELETON_SIZES = {
	xlarge: 'xlarge',
	large: 'large',
	medium: 'medium',
	small: 'small',
};

Skeleton.propTypes = {
	type: PropTypes.oneOf([
		Skeleton.SKELETON_TYPES.button,
		Skeleton.SKELETON_TYPES.circle,
		Skeleton.SKELETON_TYPES.icon,
		Skeleton.SKELETON_TYPES.text,
	]).isRequired,
	size: PropTypes.oneOf([
		Skeleton.SKELETON_SIZES.small,
		Skeleton.SKELETON_SIZES.medium,
		Skeleton.SKELETON_SIZES.large,
		Skeleton.SKELETON_SIZES.xlarge,
	]),
	width: PropTypes.number,
	height: PropTypes.number,
	name: PropTypes.string,
	className: PropTypes.string,
};

Skeleton.defaultProps = {
	type: Skeleton.SKELETON_TYPES.text,
	size: Skeleton.SKELETON_SIZES.medium,
};

Skeleton.displayName = 'Skeleton';

export default Skeleton;
