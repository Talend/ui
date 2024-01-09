import { RatioBarLine } from './RatioBarComposition.component';

import theme from './RatioBar.module.scss';

type RatioBarProps = {
	value: number;
	percentage: number;
};

export const FilledLine = ({ value, percentage }: RatioBarProps) => {
	return (
		<RatioBarLine
			dataTestId="ratioBarFilled"
			percentage={percentage}
			value={value}
			className={theme['tc-ratio-bar-line-filled']}
		/>
	);
};

export const EmptyLine = ({ value, percentage }: RatioBarProps) => {
	return (
		<RatioBarLine
			dataTestId="ratioBarEmpty"
			percentage={percentage}
			value={value}
			className={theme['tc-ratio-bar-line-empty']}
		/>
	);
};

export const ErrorLine = ({ value, percentage }: RatioBarProps) => {
	return (
		<RatioBarLine
			dataTestId="ratioBarError"
			percentage={percentage}
			value={value}
			className={theme['tc-ratio-bar-line-error']}
		/>
	);
};
