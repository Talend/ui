import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { translate } from 'react-i18next';
import Icon from '../Icon';
import theme from './Skeleton.scss';
import I18N_DOMAIN_COMPONENTS from '../constants';
import { DEFAULT_I18N } from '../translate';

/**
 * This component show some skeleton stuff
 * @param {object} props the react props
 * @param {string} props.size the wanted size
 * @param {string} props.type the type of skeleton
 * @param {number} props.width width to override size's width
 * @param {number} props.height height to override size's height
 * @param {string} props.className classes to apply on skeleton
 */
function Skeleton({ type, size, width, height, name, className, t }) {
	const classes = classnames(
		theme['tc-skeleton'],
		theme[`tc-skeleton-${type}`],
		theme[`tc-skeleton-${type}-${size}`],
		'tc-skeleton',
		`tc-skeleton-${type}`,
		`tc-skeleton-${type}-${size}`,
		className,
	);

	const translatedType = t(`SKELETON_TYPE_${type}`, { defaultValue: type });
	const ariaLabel = t('SKELETON_LOADING', { defaultValue: ' {{type}} (loading)', type: translatedType });

	if (type === 'icon') {
		return <Icon className={classes} name={name} aria-label={ariaLabel} />;
	}
	return <span style={{ width, height }} className={classes} aria-label={ariaLabel} />;
}

Skeleton.TYPES = {
	icon: 'icon',
	text: 'text',
	button: 'button',
	circle: 'circle',
};

Skeleton.SIZES = {
	xlarge: 'xlarge',
	large: 'large',
	medium: 'medium',
	small: 'small',
};

Skeleton.propTypes = {
	type: PropTypes.oneOf([
		Skeleton.TYPES.button,
		Skeleton.TYPES.circle,
		Skeleton.TYPES.icon,
		Skeleton.TYPES.text,
	]).isRequired,
	size: PropTypes.oneOf([
		Skeleton.SIZES.small,
		Skeleton.SIZES.medium,
		Skeleton.SIZES.large,
		Skeleton.SIZES.xlarge,
	]),
	width: PropTypes.number,
	height: PropTypes.number,
	name: PropTypes.string,
	className: PropTypes.string,
	t: PropTypes.func,
};

Skeleton.defaultProps = {
	type: Skeleton.TYPES.text,
	size: Skeleton.SIZES.medium,
};

Skeleton.displayName = 'Skeleton';

export default translate(I18N_DOMAIN_COMPONENTS, { i18n: DEFAULT_I18N })(Skeleton);
