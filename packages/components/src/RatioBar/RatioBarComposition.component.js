import PropTypes from 'prop-types';
import keycode from 'keycode';
import { Tooltip } from '@talend/design-system';
import { getTheme } from '../theme';
import ratioBarTheme from './RatioBar.module.scss';

const theme = getTheme(ratioBarTheme);
const minPercentage = 5;

export function RatioBarLine({
	percentage,
	tooltipLabel,
	className,
	value,
	dataFeature,
	onClick,
	dataTestId,
}) {
	const canGrow = percentage >= minPercentage;

	if (!value || value < 0) return null;

	function onKeyDown(event) {
		switch (event.keyCode) {
			case keycode.codes.enter:
				onClick(event);
				break;
			case keycode.codes.space:
				event.preventDefault(); // prevent scroll with space
				event.stopPropagation();
				onClick(event);
				break;
			default:
				break;
		}
	}

	const content = (
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions
		<div
			className={theme(
				'tc-ratio-bar-line',
				{
					'tc-ratio-bar-line-grow': canGrow,
				},
				className,
			)}
			// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
			tabIndex={0}
			style={{
				flexBasis: `${Math.max(percentage, minPercentage)}%`,
			}}
			data-testid={dataTestId}
			data-test={dataTestId}
			role={onClick && 'button'}
			data-feature={dataFeature}
			onClick={onClick}
			onKeyDown={onKeyDown}
		>
			{tooltipLabel && <span className="sr-only">{tooltipLabel}</span>}
		</div>
	);

	if (!tooltipLabel) {
		return content;
	}

	return (
		<Tooltip title={tooltipLabel} placement="bottom">
			{content}
		</Tooltip>
	);
}
RatioBarLine.propTypes = {
	percentage: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
	tooltipLabel: PropTypes.string,
	className: PropTypes.string.isRequired,
	dataTestId: PropTypes.string,
	dataFeature: PropTypes.string,
	onClick: PropTypes.func,
};

export function RatioBarComposition({ children }) {
	return <div className={theme('tc-ratio-bar')}>{children}</div>;
}
RatioBarComposition.propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
