import type { MouseEvent } from 'react';

import { RatioBar } from '../RatioBar';
import { EnrichedQualityType, QualityBarPercentages, QualityCommonProps } from './QualityBar.types';
import {
	QualityEmptyLine,
	QualityInvalidLine,
	QualityNotApplicableLine,
	QualityPlaceholderLine,
	QualityValidLine,
} from './QualityRatioBar.component';

type QualityBarRatioBarsProps = QualityCommonProps & {
	placeholder?: number;
	disabled?: boolean;
	percentages: QualityBarPercentages;
	onClick?: (e: MouseEvent<HTMLElement>, data: { type: EnrichedQualityType }) => void;
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
			<RatioBar.Composition>
				<QualityPlaceholderLine getDataFeature={getDataFeature} value={1} percentage={100} />
			</RatioBar.Composition>
		);
	}

	return (
		<RatioBar.Composition>
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
		</RatioBar.Composition>
	);
}
