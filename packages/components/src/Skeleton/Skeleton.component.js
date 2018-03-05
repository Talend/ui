import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon';
import theme from './Skeleton.scss';

export const SKELETON_TYPES = {
	icon: 'icon',
	text: 'text',
	button: 'button',
	circle: 'circle',
};

export const SKELETON_SIZES = {
	xlarge: 'xlarge',
	large: 'large',
	medium: 'medium',
	small: 'small',
};

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

Skeleton.propTypes = {
	type: PropTypes.oneOf([
		SKELETON_TYPES.button,
		SKELETON_TYPES.circle,
		SKELETON_TYPES.icon,
		SKELETON_TYPES.text,
	]).isRequired,
	size: PropTypes.oneOf([
		SKELETON_SIZES.small,
		SKELETON_SIZES.medium,
		SKELETON_SIZES.large,
		SKELETON_SIZES.xlarge,
	]),
	width: PropTypes.number,
	height: PropTypes.number,
	name: PropTypes.string,
	className: PropTypes.string,
};

Skeleton.defaultProps = {
	type: SKELETON_TYPES.text,
	size: SKELETON_SIZES.medium,
};

Skeleton.displayName = 'Skeleton';

export default Skeleton;
