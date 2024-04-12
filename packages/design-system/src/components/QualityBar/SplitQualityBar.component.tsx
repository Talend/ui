import type { MouseEvent } from 'react';

import { StackHorizontal } from '../Stack';
import {
	EnrichedQualityType,
	QualityBarPercentages,
	QualityCommonProps,
	QualityType,
} from './QualityBar.types';
import { QualityBarRatioBars } from './QualityBarRatioBars.component';
import theme from './QualityRatioBar.module.css';

type SplitQualityBarProps = QualityCommonProps & {
	percentages: QualityBarPercentages;
	disabled?: boolean;
	onClick?: (e: MouseEvent<HTMLElement>, data: { type: EnrichedQualityType }) => void;
	getDataFeature?: (type: string) => string;
};

export const SplitQualityBar = ({
	disabled,
	empty,
	getDataFeature,
	invalid,
	na,
	onClick,
	percentages,
	valid,
}: SplitQualityBarProps) => {
	const totalValues = (empty || 0) + (invalid || 0) + (na || 0) + (valid || 0);
	const usedValues = { empty, invalid, na, valid };
	const fwd = { getDataFeature, onClick };

	return (
		<StackHorizontal gap="M">
			{[QualityType.INVALID, QualityType.EMPTY, QualityType.NA, QualityType.VALID].map(type => {
				const currentTypePercentage = percentages[type] || 0;
				const currentTypeValue = usedValues[type];

				return currentTypeValue !== undefined ? (
					<StackHorizontal gap="XXS" key={type}>
						<div className={theme['split-ratio-bar-percentage']}>
							{disabled ? '- ' : currentTypePercentage}%
						</div>
						<QualityBarRatioBars
							{...fwd}
							{...{ [type]: currentTypeValue }} // Spread needed for the dynamic "type" key
							disabled={disabled}
							placeholder={totalValues - currentTypeValue}
							percentages={{ ...percentages, placeholder: 100 - currentTypePercentage }}
						/>
					</StackHorizontal>
				) : null;
			})}
		</StackHorizontal>
	);
};
