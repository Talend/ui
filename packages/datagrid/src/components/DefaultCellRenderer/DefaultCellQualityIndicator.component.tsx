import React from 'react';
import { useTranslation } from 'react-i18next';

import * as RuleCore from '@talend/rule-core';
import { CONSTRAINT_STATUS } from '@talend/rule-core/lib/components/QualityDetailsIndicator';

const { QualityDetailsIndicator } = RuleCore.components;

type DefaultCellQualityIndicatorPropTypes = {
	value: {
		quality: -1 | 0 | 1;
	};
};

function DefaultCellQualityIndicator({ value }: DefaultCellQualityIndicatorPropTypes) {
	const { t } = useTranslation();
	const { quality } = value;

	if (quality === 1) {
		return null;
	}

	const constraint =
		quality === -1
			? {
					constraintLabel: t(
						'INVALID_CELL_CONSTRAINT_LABEL_INVALID',
						'The value does not comply with the column semantic type or rule',
					),
					constraintStatus: CONSTRAINT_STATUS.EMPTY,
			  }
			: {
					constraintLabel: t('INVALID_CELL_CONSTRAINT_LABEL_EMPTY', 'A value is required'),
					constraintStatus: CONSTRAINT_STATUS.EMPTY,
			  };

	return (
		<QualityDetailsIndicator
			qualityIndex={quality}
			indicatorLabel={t('INVALID_CELL_INDICATOR_LABEL', 'See more')}
			invalidConstraint={[constraint]}
		/>
	);
}

export default DefaultCellQualityIndicator;
