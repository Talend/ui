import { useTranslation } from 'react-i18next';
import Icon from '../Icon';
import skeletonCssModule from './Skeleton.module.scss';
import { getTheme } from '../theme';
import I18N_DOMAIN_COMPONENTS from '../constants';
import { TFunction } from 'i18next';

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

function getTranslatedType(t: TFunction, type: (typeof TYPES)[keyof typeof TYPES]) {
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
export type SkeletonProps = {
	heartbeat?: boolean;
	type?: (typeof TYPES)[keyof typeof TYPES];
	size?: (typeof SIZES)[keyof typeof SIZES];
	width: number | string;
	height: number | string;
	name?: string;
	className?: string;
};

/**
 * This component show some skeleton stuff
 * @param {object} props the react props
 * @param {string} props.size the wanted size
 * @param {string} props.type the type of skeleton
 * @param {number} props.width width to override size's width
 * @param {number} props.height height to override size's height
 * @param {string} props.className classes to apply on skeleton
 */
function Skeleton({
	heartbeat = true,
	type = TYPES.text,
	size = SIZES.medium,
	width,
	height,
	name,
	className,
}: SkeletonProps) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);
	const classes = theme(
		'tc-skeleton',
		`tc-skeleton-${type}`,
		`tc-skeleton-${type}-${size}`,
		className,
		{ 'tc-skeleton-heartbeat': heartbeat },
	);

	const ariaLabel = t('SKELETON_LOADING', {
		defaultValue: '{{type}} Loading...',
		type: getTranslatedType(t, type),
	});

	if (type === 'icon' && name) {
		return <Icon className={classes} name={name} aria-label={ariaLabel} />;
	}
	return <span style={{ width, height }} className={classes} aria-label={ariaLabel} />;
}

Skeleton.displayName = 'Skeleton';
Skeleton.TYPES = TYPES;
Skeleton.SIZES = SIZES;

export default Skeleton;
