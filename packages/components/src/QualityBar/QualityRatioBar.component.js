import React from 'react';
import PropTypes from 'prop-types';
import { getTheme } from '../theme';
import qualityBarTheme from './QualityRatioBar.scss';
import RatioBar from '../RatioBar';

const theme = getTheme(qualityBarTheme);

const qualityBarLinePropTypes = {
	value: PropTypes.number.isRequired,
	percentage: PropTypes.number.isRequired,
	t: PropTypes.func.isRequired,
	dataFeature: PropTypes.string,
	onClick: PropTypes.func,
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

export function QualityInvalidLine({ value, percentage, t, dataFeature, onClick }) {
	return (
		<RatioBar.Line
			percentage={percentage}
			tooltipLabel={t('INVALID_VALUES', {
				defaultValue: '{{value}} invalid value ({{percentage}}%)',
				defaultValue_plural: '{{value}} invalid values ({{percentage}}%)',
				count: value,
				percentage,
				value: formatNumber(value),
			})}
			dataFeature={dataFeature}
			onClick={onClick}
			value={value}
			className={theme('tc-ratio-bar-line-quality-invalid')}
		/>
	);
}
QualityInvalidLine.propTypes = qualityBarLinePropTypes;

export function QualityValidLine({ value, percentage, t, dataFeature, onClick }) {
	return (
		<RatioBar.Line
			percentage={percentage}
			tooltipLabel={t('VALID_VALUES', {
				defaultValue: '{{value}} valid value ({{percentage}}%)',
				defaultValue_plural: '{{value}} valid values ({{percentage}}%)',
				count: value,
				percentage,
				value: formatNumber(value),
			})}
			dataFeature={dataFeature}
			onClick={onClick}
			value={value}
			className={theme('tc-ratio-bar-line-quality-valid')}
		/>
	);
}
QualityValidLine.propTypes = qualityBarLinePropTypes;

export function QualityEmptyLine({ value, percentage, t, dataFeature, onClick }) {
	return (
		<RatioBar.Line
			percentage={percentage}
			tooltipLabel={t('EMPTY_VALUES', {
				defaultValue: '{{value}} empty value ({{percentage}}%)',
				defaultValue_plural: '{{value}} empty values ({{percentage}}%)',
				count: value,
				percentage,
				value: formatNumber(value),
			})}
			dataFeature={dataFeature}
			onClick={onClick}
			value={value}
			className={theme('tc-ratio-bar-line-quality-empty')}
		/>
	);
}
QualityEmptyLine.propTypes = qualityBarLinePropTypes;

export function QualityNotApplicableLine({ value, percentage, t, dataFeature, onClick }) {
	return (
		<RatioBar.Line
			percentage={percentage}
			tooltipLabel={t('NOT_APPLICABLE_VALUES', {
				defaultValue: '{{value}} not applicable value ({{percentage}}%)',
				defaultValue_plural: '{{value}} not applicable values ({{percentage}}%)',
				count: value,
				percentage,
				value: formatNumber(value),
			})}
			dataFeature={dataFeature}
			onClick={onClick}
			value={value}
			className={theme('tc-ratio-bar-line-quality-na')}
		/>
	);
}
QualityNotApplicableLine.propTypes = qualityBarLinePropTypes;
