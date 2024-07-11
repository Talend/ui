import { RatioBarComposition } from '../RatioBar';
import { QualityBarPercentages, QualityCommonProps } from './QualityBar.types';
import {
	QualityEmptyLine,
	QualityInvalidLine,
	QualityNotApplicableLine,
	QualityPlaceholderLine,
	QualityValidLine,
} from './QualityRatioBar.component';

type QualityBarRatioBarsProps = QualityCommonProps & {
	percentages: QualityBarPercentages;
};

export const QualityBarRatioBars = ({
	valid = 0,
	invalid = 0,
	empty = 0,
	na = 0,
	placeholder = 0,
	percentages,
	getDataFeature,
	onClick,
	disabled,
	tooltipLabels,
}: QualityBarRatioBarsProps) => {
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
				tooltipLabel={tooltipLabels?.invalid}
			/>
			<QualityEmptyLine
				onClick={onClick}
				getDataFeature={getDataFeature}
				value={empty}
				percentage={percentages.empty}
				tooltipLabel={tooltipLabels?.empty}
			/>
			<QualityNotApplicableLine
				onClick={onClick}
				getDataFeature={getDataFeature}
				value={na}
				percentage={percentages.na}
				tooltipLabel={tooltipLabels?.na}
			/>
			<QualityValidLine
				onClick={onClick}
				getDataFeature={getDataFeature}
				value={valid}
				percentage={percentages.valid}
				tooltipLabel={tooltipLabels?.valid}
			/>
			<QualityPlaceholderLine
				getDataFeature={getDataFeature}
				value={placeholder}
				percentage={percentages.placeholder}
			/>
		</RatioBarComposition>
	);
};
