import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TALEND_QUALITY_EMPTY_KEY, TALEND_QUALITY_INVALID_KEY } from '../../constants';

import theme from './QualityIndicator.scss';

export default function QualityIndicator(props) {
	return (
		<div
			className={classNames(theme['td-cell-quality-indicator'], 'td-cell-quality-indicator', {
				[theme['td-cell-quality-indicator-invalid']]: props.value === TALEND_QUALITY_INVALID_KEY,
				[theme['td-cell-quality-indicator-empty']]: props.value === TALEND_QUALITY_EMPTY_KEY,
			})}
			title={props.tooltip}
		/>
	);
}

QualityIndicator.propTypes = {
	tooltip: PropTypes.string,
	value: PropTypes.oneOf([TALEND_QUALITY_INVALID_KEY, TALEND_QUALITY_EMPTY_KEY]),
};
