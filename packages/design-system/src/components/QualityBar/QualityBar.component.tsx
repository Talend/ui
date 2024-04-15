import { QualityCommonProps } from './QualityBar.types';
import { QualityBarRatioBars } from './QualityBarRatioBars.component';
import { getQualityPercentagesRounded } from './QualityRatioBar.utils';
import { SplitQualityBar } from './SplitQualityBar.component';

export type QualityBarProps = QualityCommonProps & {
	digits?: number;
	split?: boolean;
};

export const QualityBar = ({
	valid,
	invalid,
	empty,
	na,
	placeholder,
	digits = 1,
	split = false,
	...rest
}: QualityBarProps) => {
	const percentages = getQualityPercentagesRounded(digits, invalid, empty, valid, na, placeholder);

	return split ? (
		<SplitQualityBar
			valid={valid}
			invalid={invalid}
			empty={empty}
			na={na}
			percentages={percentages}
			{...rest}
		/>
	) : (
		<QualityBarRatioBars
			valid={valid}
			invalid={invalid}
			empty={empty}
			na={na}
			placeholder={placeholder}
			percentages={percentages}
			{...rest}
		/>
	);
};
