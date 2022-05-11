import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { QUALITY_INVALID_KEY } from '../../constants';

import theme from './QualityIndicator.scss';
import { Quality } from '../../types';

export interface QualityIndicatorProps {
	qualityIndex: keyof Quality;
}

function QualityIndicator({ qualityIndex }: QualityIndicatorProps): JSX.Element {
	const { t } = useTranslation();

	if (qualityIndex !== QUALITY_INVALID_KEY) {
		return <></>;
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
