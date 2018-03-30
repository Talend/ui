import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { translate } from 'react-i18next';

import I18N_DOMAIN_DATAGRID from '../../constant';
import DEFAULT_I18N from '../../translate';

import theme from './QualityBar.scss';

const QUALITY_BAR_MIN_WIDTH = 5;

export function formatNumber(value) {
	const parts = value.toString().split('.');
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
	return parts.join('.');
}

export function QualityBar(props) {
	return (
		<div className={classNames(theme['td-quality-bar'], 'td-quality-bar')}>
			{!!props.invalid.total && (
				<span
					className={classNames(theme['td-quality-bar-invalid'], 'td-quality-bar-invalid')}
					style={{ width: `${props.invalid.percentage}%`, minWidth: `${QUALITY_BAR_MIN_WIDTH}%` }}
					title={props.t('QUALITY_BAR_INVALID', {
						count: formatNumber(props.invalid.total),
						percentage: props.invalid.percentage,
						defaultValue: '{{count}} invalid values ({{percentage}}%)',
					})}
				/>
			)}
			{!!props.empty.total && (
				<span
					className={classNames(theme['td-quality-bar-empty'], 'td-quality-bar-empty')}
					style={{ width: `${props.empty.percentage}%`, minWidth: `${QUALITY_BAR_MIN_WIDTH}%` }}
					title={props.t('QUALITY_BAR_EMPTY', {
						count: formatNumber(props.empty.total),
						percentage: props.empty.percentage,
						defaultValue: '{{count}} empty values ({{percentage}}%)',
					})}
				/>
			)}
			{!!props.valid.total && (
				<span
					className={classNames(theme['td-quality-bar-valid'], 'td-quality-bar-valid')}
					style={{ width: `${props.valid.percentage}%`, minWidth: `${QUALITY_BAR_MIN_WIDTH}%` }}
					title={props.t('QUALITY_BAR_VALID', {
						count: formatNumber(props.valid.total),
						percentage: props.valid.percentage,
						defaultValue: '{{count}} valid values ({{percentage}}%)',
					})}
				/>
			)}
		</div>
	);
}

const QUALITY_PROPTYPE = {
	total: PropTypes.number,
	percentage: PropTypes.number,
};

QualityBar.propTypes = {
	valid: PropTypes.shape(QUALITY_PROPTYPE),
	empty: PropTypes.shape(QUALITY_PROPTYPE),
	invalid: PropTypes.shape(QUALITY_PROPTYPE),
	t: PropTypes.func,
};

QualityBar.defaultProps = {
	t: DEFAULT_I18N.t.bind(DEFAULT_I18N),
};

export default translate(I18N_DOMAIN_DATAGRID, { i18n: DEFAULT_I18N })(QualityBar);
