import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withTranslation } from 'react-i18next';

import I18N_DOMAIN_DATAGRID from '../../constant';
import getDefaultT from '../../translate';

import { QUALITY_INVALID_KEY, QUALITY_EMPTY_KEY, QUALITY_VALID_KEY } from '../../constants';

import theme from './QualityIndicator.scss';

function getTooltip(t, qualityIndex) {
	if (qualityIndex === QUALITY_INVALID_KEY) {
		return t('QUALITY_INDICATOR_INVALID_VALUE', { defaultValue: 'Invalid value' });
	}

	return '';
}

export function QualityIndicatorComponent(props) {
	if (props.qualityIndex !== QUALITY_INVALID_KEY) {
		return false;
	}

	return (
		<div
			className={classNames(theme['td-cell-quality-indicator'], 'td-cell-quality-indicator', {
				[theme['td-cell-quality-indicator-invalid']]: props.qualityIndex === QUALITY_INVALID_KEY,
			})}
			title={getTooltip(props.t, props.qualityIndex)}
		/>
	);
}

QualityIndicatorComponent.propTypes = {
	qualityIndex: PropTypes.oneOf([QUALITY_INVALID_KEY, QUALITY_EMPTY_KEY, QUALITY_VALID_KEY]),
	t: PropTypes.func,
};

QualityIndicatorComponent.defaultProps = {
	t: getDefaultT(),
};

export default withTranslation(I18N_DOMAIN_DATAGRID)(QualityIndicatorComponent);
