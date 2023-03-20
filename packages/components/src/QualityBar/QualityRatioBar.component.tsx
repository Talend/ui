import React from 'react';
import { useTranslation } from 'react-i18next';

import I18N_DOMAIN_COMPONENTS from '../constants';
import { RatioBarLine } from '../RatioBar';
import { getTheme } from '../theme';
import { EnrichedQualityType, QualityType } from './QualityBar.types';

import qualityBarTheme from './QualityRatioBar.module.scss';

const theme = getTheme(qualityBarTheme);

/**
 * formatNumber - format a number with a space for the thousand separator
 *
 * @param  {number} value number to format
 * @return {string}       formated number
 * @example
 * 	formatNumber(1200); // return 1 200
 */
function formatNumber(value?: number) {
	if (!value) {
		return '';
	}
	const parts = value.toString().split('.');
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
	return parts.join('.');
}

type SpecificQualityBarProps = {
	percentage: number;
	value: number;
	getDataFeature?: (type: EnrichedQualityType) => string;
	onClick?: (e: React.MouseEvent<HTMLElement>, data: { type: EnrichedQualityType }) => void;
};

type QualityRatioBarProps = SpecificQualityBarProps & {
	type: EnrichedQualityType;
	tooltipLabel?: string;
};

function QualityRatioBar({ onClick, type, getDataFeature, ...props }: QualityRatioBarProps) {
	const specificProps = {
		className: theme('quality-ratio-bar', `quality-ratio-bar--${type}`),
		onClick: onClick ? (e: React.MouseEvent<HTMLElement>) => onClick(e, { type }) : null,
		dataFeature: getDataFeature ? getDataFeature(type) : null,
		dataTestId: `quality-bar-${type}`,
	};

	return <RatioBarLine {...props} {...specificProps} />;
}

export function QualityInvalidLine({ percentage, value, ...rest }: SpecificQualityBarProps) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);

	return (
		<QualityRatioBar
			percentage={percentage}
			value={value}
			type={QualityType.INVALID}
			tooltipLabel={t('INVALID_VALUES', {
				defaultValue: '{{value}} invalid value ({{percentage}}%)',
				defaultValue_plural: '{{value}} invalid values ({{percentage}}%)',
				count: value,
				percentage,
				value: formatNumber(value),
			})}
			{...rest}
		/>
	);
}

export function QualityValidLine({ percentage, value, ...rest }: SpecificQualityBarProps) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);

	return (
		<QualityRatioBar
			percentage={percentage}
			value={value}
			type={QualityType.VALID}
			tooltipLabel={t('VALID_VALUES', {
				defaultValue: '{{value}} valid value ({{percentage}}%)',
				defaultValue_plural: '{{value}} valid values ({{percentage}}%)',
				count: value,
				percentage,
				value: formatNumber(value),
			})}
			{...rest}
		/>
	);
}

export function QualityEmptyLine({ percentage, value, ...rest }: SpecificQualityBarProps) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);

	return (
		<QualityRatioBar
			percentage={percentage}
			value={value}
			type={QualityType.EMPTY}
			tooltipLabel={t('EMPTY_VALUES', {
				defaultValue: '{{value}} empty value ({{percentage}}%)',
				defaultValue_plural: '{{value}} empty values ({{percentage}}%)',
				count: value,
				percentage,
				value: formatNumber(value),
			})}
			{...rest}
		/>
	);
}

export function QualityNotApplicableLine({ percentage, value, ...rest }: SpecificQualityBarProps) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);

	return (
		<QualityRatioBar
			percentage={percentage}
			value={value}
			type={QualityType.NA}
			tooltipLabel={t('NOT_APPLICABLE_VALUES', {
				defaultValue: '{{value}} not applicable value ({{percentage}}%)',
				defaultValue_plural: '{{value}} not applicable values ({{percentage}}%)',
				count: value,
				percentage,
				value: formatNumber(value),
			})}
			{...rest}
		/>
	);
}

export function QualityPlaceholderLine(props: Omit<SpecificQualityBarProps, 'onClick'>) {
	return <QualityRatioBar {...props} type="placeholder" />;
}
