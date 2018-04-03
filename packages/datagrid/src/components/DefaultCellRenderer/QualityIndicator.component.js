import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { translate } from 'react-i18next';

import I18N_DOMAIN_DATAGRID from '../../constant';
import DEFAULT_I18N from '../../translate';

import { QUALITY_INVALID_KEY } from '../../constants';

import theme from './QualityIndicator.scss';

export function QualityIndicatorComponent(props) {
	return (
		<div
			className={classNames(theme['td-cell-quality-indicator'], 'td-cell-quality-indicator', {
				[theme['td-cell-quality-indicator-invalid']]: props.value === QUALITY_INVALID_KEY,
			})}
			title={props.t('QUALITY_INDICATOR_INVALID_VALUE', { defaultValue: 'Invalid value' })}
		/>
	);
}

QualityIndicatorComponent.propTypes = {
	value: PropTypes.oneOf([QUALITY_INVALID_KEY]),
	t: PropTypes.func,
};

QualityIndicatorComponent.defaultProps = {
	t: DEFAULT_I18N.t.bind(DEFAULT_I18N),
};

export default translate(I18N_DOMAIN_DATAGRID, { i18n: DEFAULT_I18N })(QualityIndicatorComponent);
