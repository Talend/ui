import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Icon from '../Icon';
import skeletonCssModule from './Skeleton.scss';
import { getTheme } from '../theme';
import I18N_DOMAIN_COMPONENTS from '../constants';
import '../translate';

const theme = getTheme(skeletonCssModule);
const TYPES = {
	icon: 'icon',
	text: 'text',
	button: 'button',
	circle: 'circle',
};

const SIZES = {
	xlarge: 'xlarge',
	large: 'large',
	medium: 'medium',
	small: 'small',
};

function getTranslatedType(t, type) {
	switch (type) {
		case TYPES.button:
			return t('SKELETON_TYPE_BUTTON', { defaultValue: 'button' });
		case TYPES.circle:
			return t('SKELETON_TYPE_CIRCLE', { defaultValue: 'circle' });
		case TYPES.icon:
			return t('SKELETON_TYPE_ICON', { defaultValue: 'icon' });
		case TYPES.text:
			return t('SKELETON_TYPE_TEXT', { defaultValue: 'text' });
		default:
			return type;
	}
}

/**
 * This component show some skeleton stuff
 * @param {object} props the react props
 * @param {string} props.size the wanted size
 * @param {string} props.type the type of skeleton
 * @param {number} props.width width to override size's width
 * @param {number} props.height height to override size's height
 * @param {string} props.className classes to apply on skeleton
 */
function Skeleton({ heartbeat, type, size, width, height, name, className, t }) {
	const classes = theme(
		'tc-skeleton',
		`tc-skeleton-${type}`,
		`tc-skeleton-${type}-${size}`,
		className,
		{ 'tc-skeleton-heartbeat': heartbeat },
	);

	const ariaLabel = t('SKELETON_LOADING', {
		defaultValue: '{{type}} (loading)',
		type: getTranslatedType(t, type),
	});

	if (type === 'icon') {
		return <Icon className={classes} name={name} aria-label={ariaLabel} />;
	}
	return <span style={{ width, height }} className={classes} aria-label={ariaLabel} />;
}

Skeleton.propTypes = {
	heartbeat: PropTypes.bool,
	type: PropTypes.oneOf([TYPES.button, TYPES.circle, TYPES.icon, TYPES.text]).isRequired,
	size: PropTypes.oneOf([SIZES.small, SIZES.medium, SIZES.large, SIZES.xlarge]),
	width: PropTypes.number,
	height: PropTypes.number,
	name: PropTypes.string,
	className: PropTypes.string,
	t: PropTypes.func,
};

Skeleton.defaultProps = {
	type: TYPES.text,
	size: SIZES.medium,
	heartbeat: true,
};

Skeleton.displayName = 'Skeleton';
const TranslatedSkeleton = withTranslation(I18N_DOMAIN_COMPONENTS)(Skeleton);
TranslatedSkeleton.TYPES = TYPES;
TranslatedSkeleton.SIZES = SIZES;

export default TranslatedSkeleton;
