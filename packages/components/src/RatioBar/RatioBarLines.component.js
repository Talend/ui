import PropTypes from 'prop-types';
import { getTheme } from '../theme';
import { RatioBarLine } from './RatioBarComposition.component';
import ratioBarTheme from './RatioBar.module.scss';

const theme = getTheme(ratioBarTheme);

const ratioBarLinePropTypes = {
	value: PropTypes.number.isRequired,
	percentage: PropTypes.number.isRequired,
};

export function FilledLine({ value, percentage }) {
	return (
		<RatioBarLine
			percentage={percentage}
			value={value}
			className={theme('tc-ratio-bar-line-filled')}
		/>
	);
}
FilledLine.propTypes = ratioBarLinePropTypes;

export function EmptyLine({ value, percentage }) {
	return (
		<RatioBarLine
			percentage={percentage}
			value={value}
			className={theme('tc-ratio-bar-line-empty')}
		/>
	);
}
EmptyLine.propTypes = ratioBarLinePropTypes;

export function ErrorLine({ value, percentage }) {
	return (
		<RatioBarLine
			percentage={percentage}
			value={value}
			className={theme('tc-ratio-bar-line-error')}
		/>
	);
}
ErrorLine.propTypes = ratioBarLinePropTypes;
