import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

import I18N_DOMAIN_COMPONENTS from '../constants';
import RatioBar from '../RatioBar';
import { getTheme } from '../theme';

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
function formatNumber(value = '') {
	const parts = value.toString().split('.');
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
	return parts.join('.');
}

export const QualityType = {
	VALID: 'valid',
	INVALID: 'invalid',
	EMPTY: 'empty',
	NA: 'na',
};

function QualityRatioBar({ onClick, type, getDataFeature, ...props }) {
	const specificProps = {
		className: theme('quality-ratio-bar', `quality-ratio-bar--${type}`),
		onClick: onClick ? e => onClick(e, { type }) : null,
		dataFeature: getDataFeature ? getDataFeature(type) : null,
	};

	return <RatioBar.Line {...props} {...specificProps} />;
}

QualityRatioBar.propTypes = {
	...omit(RatioBar.Line.propTypes, ['dataFeature', 'className']),
	type: PropTypes.oneOf([...Object.values(QualityType), 'placeholder']).isRequired,
	getDataFeature: PropTypes.func,
};

const SpecificQualityBarPropTypes = {
	...omit(QualityRatioBar.propTypes, ['type', 'tooltipLabel']),
};

export function QualityInvalidLine(props) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);
	const { percentage, value } = props;

	return (
		<QualityRatioBar
			{...props}
			type={QualityType.INVALID}
			tooltipLabel={t('INVALID_VALUES', {
				defaultValue: '{{value}} invalid value ({{percentage}}%)',
				defaultValue_plural: '{{value}} invalid values ({{percentage}}%)',
				count: value,
				percentage,
				value: formatNumber(value),
			})}
		/>
	);
}

QualityInvalidLine.propTypes = SpecificQualityBarPropTypes;

export function QualityValidLine(props) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);
	const { percentage, value } = props;

	return (
		<QualityRatioBar
			{...props}
			type={QualityType.VALID}
			tooltipLabel={t('VALID_VALUES', {
				defaultValue: '{{value}} valid value ({{percentage}}%)',
				defaultValue_plural: '{{value}} valid values ({{percentage}}%)',
				count: value,
				percentage,
				value: formatNumber(value),
			})}
		/>
	);
}

QualityValidLine.propTypes = SpecificQualityBarPropTypes;

export function QualityEmptyLine(props) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);
	const { percentage, value } = props;

	return (
		<QualityRatioBar
			{...props}
			type={QualityType.EMPTY}
			tooltipLabel={t('EMPTY_VALUES', {
				defaultValue: '{{value}} empty value ({{percentage}}%)',
				defaultValue_plural: '{{value}} empty values ({{percentage}}%)',
				count: value,
				percentage,
				value: formatNumber(value),
			})}
		/>
	);
}

QualityEmptyLine.propTypes = SpecificQualityBarPropTypes;

export function QualityNotApplicableLine(props) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);
	const { percentage, value } = props;

	return (
		<QualityRatioBar
			{...props}
			type={QualityType.NA}
			tooltipLabel={t('NOT_APPLICABLE_VALUES', {
				defaultValue: '{{value}} not applicable value ({{percentage}}%)',
				defaultValue_plural: '{{value}} not applicable values ({{percentage}}%)',
				count: value,
				percentage,
				value: formatNumber(value),
			})}
		/>
	);
}

QualityNotApplicableLine.propTypes = SpecificQualityBarPropTypes;

export function QualityPlaceholderLine(props) {
	return <QualityRatioBar {...props} type="placeholder" />;
}

QualityPlaceholderLine.propTypes = {
	...omit(SpecificQualityBarPropTypes, ['onClick']),
};
