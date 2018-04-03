import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { translate } from 'react-i18next';

import I18N_DOMAIN_DATAGRID from '../../constant';
import DEFAULT_I18N from '../../translate';

import { TALEND_QUALITY_INVALID_KEY } from '../../constants';

import theme from './QualityIndicator.scss';

export function QualityIndicator(props) {
	return (
		<div
			className={classNames(theme['td-cell-quality-indicator'], 'td-cell-quality-indicator', {
				[theme['td-cell-quality-indicator-invalid']]: props.value === TALEND_QUALITY_INVALID_KEY,
			})}
			title={props.t('QUALITY_INDICATOR_INVALID_VALUE', { defaultValue: 'Invalid value' })}
		/>
	);
}

QualityIndicator.propTypes = {
	value: PropTypes.oneOf([TALEND_QUALITY_INVALID_KEY]),
	t: PropTypes.func,
};

QualityIndicator.defaultProps = {
	t: DEFAULT_I18N.t.bind(DEFAULT_I18N),
};

export default translate(I18N_DOMAIN_DATAGRID, { i18n: DEFAULT_I18N })(QualityIndicator);
