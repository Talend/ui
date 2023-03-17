import React from 'react';

import {
	QualityEmptyLine,
	QualityInvalidLine,
	QualityNotApplicableLine,
	QualityPlaceholderLine,
	QualityValidLine,
} from './QualityRatioBar.component';
import { RatioBarComposition } from '../RatioBar';
import { EnrichedQualityType, QualityBarPercentages, QualityCommonProps } from './QualityBar.types';

type QualityBarRatioBarsProps = QualityCommonProps & {
	placeholder?: number;
	disabled?: boolean;
	percentages: QualityBarPercentages;
	onClick?: (e: React.MouseEvent<HTMLElement>, data: { type: EnrichedQualityType }) => void;
	getDataFeature?: (type: string) => string;
};

export function QualityBarRatioBars({
	valid = 0,
	invalid = 0,
	empty = 0,
	na = 0,
	placeholder = 0,
	percentages,
	getDataFeature,
	onClick,
	disabled,
}: QualityBarRatioBarsProps) {
	if (disabled) {
		return (
			<RatioBarComposition>
				<QualityPlaceholderLine getDataFeature={getDataFeature} value={1} percentage={100} />
			</RatioBarComposition>
		);
	}

	return (
		<RatioBarComposition>
			<QualityInvalidLine
				onClick={onClick}
				getDataFeature={getDataFeature}
				value={invalid}
				percentage={percentages.invalid}
			/>
			<QualityEmptyLine
				onClick={onClick}
				getDataFeature={getDataFeature}
				value={empty}
				percentage={percentages.empty}
			/>
			<QualityNotApplicableLine
				onClick={onClick}
				getDataFeature={getDataFeature}
				value={na}
				percentage={percentages.na}
			/>
			<QualityValidLine
				onClick={onClick}
				getDataFeature={getDataFeature}
				value={valid}
				percentage={percentages.valid}
			/>
			<QualityPlaceholderLine
				getDataFeature={getDataFeature}
				value={placeholder}
				percentage={percentages.placeholder}
			/>
		</RatioBarComposition>
	);
}
