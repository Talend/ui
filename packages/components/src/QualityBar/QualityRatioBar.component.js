import React from 'react';
import PropTypes from 'prop-types';

import RatioBar from '../RatioBar';
import { getTheme } from '../theme';

import qualityBarTheme from './QualityRatioBar.scss';

const theme = getTheme(qualityBarTheme);

const qualityBarLinePropTypes = {
	dataFeature: PropTypes.string,
	onClick: PropTypes.func,
	percentage: PropTypes.number.isRequired,
	t: PropTypes.func.isRequired,
	value: PropTypes.number.isRequired,
};

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

export function QualityInvalidLine(props) {
	const { percentage, value, t } = props;

	return (
		<RatioBar.Line
			{...props}
			tooltipLabel={t('INVALID_VALUES', {
				defaultValue: '{{value}} invalid value ({{percentage}}%)',
				defaultValue_plural: '{{value}} invalid values ({{percentage}}%)',
				count: value,
				percentage,
				value: formatNumber(value),
			})}
			className={theme('quality-ratio-bar', 'quality-ratio-bar--invalid')}
		/>
	);
}

QualityInvalidLine.propTypes = qualityBarLinePropTypes;

export function QualityValidLine(props) {
	const { percentage, value, t } = props;

	return (
		<RatioBar.Line
			{...props}
			tooltipLabel={t('VALID_VALUES', {
				defaultValue: '{{value}} valid value ({{percentage}}%)',
				defaultValue_plural: '{{value}} valid values ({{percentage}}%)',
				count: value,
				percentage,
				value: formatNumber(value),
			})}
			className={theme('quality-ratio-bar', 'quality-ratio-bar--valid')}
		/>
	);
}

QualityValidLine.propTypes = qualityBarLinePropTypes;

export function QualityEmptyLine(props) {
	const { percentage, value, t } = props;

	return (
		<RatioBar.Line
			{...props}
			tooltipLabel={t('EMPTY_VALUES', {
				defaultValue: '{{value}} empty value ({{percentage}}%)',
				defaultValue_plural: '{{value}} empty values ({{percentage}}%)',
				count: value,
				percentage,
				value: formatNumber(value),
			})}
			className={theme('quality-ratio-bar', 'quality-ratio-bar--empty')}
		/>
	);
}

QualityEmptyLine.propTypes = qualityBarLinePropTypes;

export function QualityNotApplicableLine(props) {
	const { percentage, value, t } = props;

	return (
		<RatioBar.Line
			{...props}
			tooltipLabel={t('NOT_APPLICABLE_VALUES', {
				defaultValue: '{{value}} not applicable value ({{percentage}}%)',
				defaultValue_plural: '{{value}} not applicable values ({{percentage}}%)',
				count: value,
				percentage,
				value: formatNumber(value),
			})}
			className={theme('quality-ratio-bar', 'quality-ratio-bar--na')}
		/>
	);
}

QualityNotApplicableLine.propTypes = qualityBarLinePropTypes;

export function QualityPlaceholderLine(props) {
	return (
		<RatioBar.Line
			{...props}
			className={theme('quality-ratio-bar', 'quality-ratio-bar--placeholder')}
		/>
	);
}

QualityPlaceholderLine.propTypes = {
	onClick: PropTypes.func,
	percentage: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};
