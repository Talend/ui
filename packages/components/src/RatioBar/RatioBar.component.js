import PropTypes from 'prop-types';
import { Trans } from 'react-i18next';
import { RatioBarComposition } from './RatioBarComposition.component';
import { EmptyLine, FilledLine, ErrorLine } from './RatioBarLines.component';
import { getTheme } from '../theme';
import ratioBarTheme from './RatioBar.module.scss';

const theme = getTheme(ratioBarTheme);

function getFilledValues(amount, total) {
	if (!amount || amount < 0) {
		return { percentage: 0, amount: 0 };
	}

	if (amount > total) {
		return { percentage: 100, amount };
	}

	return { percentage: (amount / total) * 100, amount };
}

function getEmptyValues(amount, total) {
	if (!amount || amount < 0) {
		return { percentage: 100, amount: total };
	}
	if (amount > total) {
		return { percentage: 0, amount: 0 };
	}

	return { percentage: (1 - amount / total) * 100, amount: total - amount };
}

function getLabel(amount, errors, total) {
	if (!amount && amount !== 0) {
		return (
			<div className={theme('tc-ratio-bar-counter')}>
				<Trans i18nKey="tui-components:NA">
					<strong>N</strong>/A
				</Trans>
			</div>
		);
	}
	return (
		<div className={theme('tc-ratio-bar-counter')}>
			<strong>{amount + errors}</strong>/{total}
		</div>
	);
}

export function RatioBar({ amount, total, errors = 0, hideLabel = false }) {
	const filled = getFilledValues(amount, total);
	const error = getFilledValues(errors, total);
	const empty = getEmptyValues(amount + errors, total);

	return (
		<RatioBarComposition>
			<FilledLine percentage={filled.percentage} value={filled.amount} />
			<ErrorLine percentage={error.percentage} value={error.amount} />
			<EmptyLine percentage={empty.percentage} value={empty.amount} />
			{!hideLabel && getLabel(amount, errors, total)}
		</RatioBarComposition>
	);
}

RatioBar.propTypes = {
	amount: PropTypes.number,
	errors: PropTypes.number,
	total: PropTypes.number.isRequired,
	hideLabel: PropTypes.bool,
};
