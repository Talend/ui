import React from 'react';
import PropTypes from 'prop-types';
import { Trans } from 'react-i18next';
import { RatioBarComposition } from './RatioBarComposition.component';
import { EmptyLine, FilledLine } from './RatioBarLines.component';
import { getTheme } from '../theme';
import qualityBarTheme from './RatioBar.scss';

const theme = getTheme(qualityBarTheme);

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

function getLabel(amount, total) {
	if (!amount) {
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
			<strong>{amount}</strong>/{total}
		</div>
	);
}

export function RatioBar({ amount, total }) {
	const filled = getFilledValues(amount, total);
	const empty = getEmptyValues(amount, total);

	return (
		<RatioBarComposition>
			<FilledLine percentage={filled.percentage} value={filled.amount} />
			<EmptyLine percentage={empty.percentage} value={empty.amount} />
			{getLabel(amount, total)}
		</RatioBarComposition>
	);
}

RatioBar.propTypes = {
	amount: PropTypes.number.isRequired,
	total: PropTypes.number.isRequired,
};
