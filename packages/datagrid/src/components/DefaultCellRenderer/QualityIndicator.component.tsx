import React from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'classnames';

import { QUALITY_INVALID_KEY } from '../../constants';
import { QualityIndex } from '../../types';

import theme from './QualityIndicator.module.scss';

export interface QualityIndicatorProps {
	qualityIndex: QualityIndex;
}

function QualityIndicator({ qualityIndex }: QualityIndicatorProps): JSX.Element | null {
	const { t } = useTranslation();

	if (qualityIndex !== QUALITY_INVALID_KEY) {
		return null;
	}

	return (
		<div
			className={classNames(
				theme['td-cell-quality-indicator'],
				// required for hover styling by parent
				'td-cell-quality-indicator',
				theme['td-cell-quality-indicator--invalid'],
			)}
			title={t('QUALITY_INDICATOR_INVALID_VALUE', 'Invalid value')}
		/>
	);
}

export default QualityIndicator;
