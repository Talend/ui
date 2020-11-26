import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import I18N_DOMAIN_DATAGRID from '../../constant';

import { QUALITY_INVALID_KEY, QUALITY_EMPTY_KEY, QUALITY_VALID_KEY } from '../../constants';

import theme from './QualityIndicator.scss';

function QualityIndicator(props) {
	const { t } = useTranslation(I18N_DOMAIN_DATAGRID);

	if (props.qualityIndex !== QUALITY_INVALID_KEY) {
		return null;
	}

	return (
		<div
			className={classNames(
				theme['td-cell-quality-indicator'],
				'td-cell-quality-indicator',
				theme['td-cell-quality-indicator-invalid'],
			)}
			title={t('QUALITY_INDICATOR_INVALID_VALUE', { defaultValue: 'Invalid value' })}
		/>
	);
}
QualityIndicator.propTypes = {
	qualityIndex: PropTypes.oneOf([QUALITY_INVALID_KEY, QUALITY_EMPTY_KEY, QUALITY_VALID_KEY]),
};
QualityIndicator.theme = theme;

export default QualityIndicator;
