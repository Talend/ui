import styles from './RatioBar.module.css';
import { RatioBarLine } from './RatioBarComposition.component';

type RatioBarLineProps = {
	value: number;
	percentage: number;
};

export const FilledLine = ({ value, percentage }: RatioBarLineProps) => (
	<RatioBarLine
		percentage={percentage}
		value={value}
		className={styles['tc-ratio-bar-line-filled']}
		dataTestId="ratio-bar-filled"
	/>
);

export const EmptyLine = ({ value, percentage }: RatioBarLineProps) => (
	<RatioBarLine
		percentage={percentage}
		value={value}
		className={styles['tc-ratio-bar-line-empty']}
		dataTestId="ratio-bar-empty"
	/>
);

export const ErrorLine = ({ value, percentage }: RatioBarLineProps) => (
	<RatioBarLine
		percentage={percentage}
		value={value}
		className={styles['tc-ratio-bar-line-error']}
		dataTestId="ratio-bar-error"
	/>
);
