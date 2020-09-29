import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import I18N_DOMAIN_DATAGRID from '../../constant';
import getDefaultT from '../../translate';

import theme from './QualityBar.scss';

const QUALITY_BAR_MIN_WIDTH = 5;

/**
 * formatNumber - format a number with a space for the thousand separator
 *
 * @param  {number} value number to format
 * @return {string}       formated number
 * @example
 * 	formatNumber(1200); // return 1 200
 */
export function formatNumber(value) {
	const parts = value.toString().split('.');
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
	return parts.join('.');
}

function QualityBar(props) {
	const { t = getDefaultT() } = useTranslation(I18N_DOMAIN_DATAGRID);
	return (
		<div className={classNames(theme['td-quality-bar'], 'td-quality-bar')}>
			{!!props.invalid.total && (
				<span
					className={classNames(theme['td-quality-bar-invalid'], 'td-quality-bar-invalid')}
					style={{ width: `${props.invalid.percentage}%`, minWidth: `${QUALITY_BAR_MIN_WIDTH}%` }}
					title={t('QUALITY_BAR_INVALID', {
						count: props.invalid.total,
						defaultValue: '{{total}} invalid values ({{percentage}}%)',
						percentage: props.invalid.percentage,
						total: formatNumber(props.invalid.total),
					})}
				/>
			)}
			{!!props.empty.total && (
				<span
					className={classNames(theme['td-quality-bar-empty'], 'td-quality-bar-empty')}
					style={{ width: `${props.empty.percentage}%`, minWidth: `${QUALITY_BAR_MIN_WIDTH}%` }}
					title={t('QUALITY_BAR_EMPTY', {
						count: props.empty.total,
						defaultValue: '{{total}} empty values ({{percentage}}%)',
						percentage: props.empty.percentage,
						total: formatNumber(props.empty.total),
					})}
				/>
			)}
			{!!props.valid.total && (
				<span
					className={classNames(theme['td-quality-bar-valid'], 'td-quality-bar-valid')}
					style={{ width: `${props.valid.percentage}%`, minWidth: `${QUALITY_BAR_MIN_WIDTH}%` }}
					title={t('QUALITY_BAR_VALID', {
						count: props.valid.total,
						total: formatNumber(props.valid.total),
						percentage: props.valid.percentage,
						defaultValue: '{{total}} valid values ({{percentage}}%)',
					})}
				/>
			)}
		</div>
	);
}

export const QUALITY_PROPTYPE = {
	total: PropTypes.number,
	percentage: PropTypes.number,
};

QualityBar.propTypes = {
	valid: PropTypes.shape(QUALITY_PROPTYPE),
	empty: PropTypes.shape(QUALITY_PROPTYPE),
	invalid: PropTypes.shape(QUALITY_PROPTYPE),
};

export default QualityBar;
