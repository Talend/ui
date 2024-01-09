import { Trans } from 'react-i18next';

import { RatioBarComposition } from './RatioBarComposition.component';
import { EmptyLine, ErrorLine, FilledLine } from './RatioBarLines.component';

import theme from './RatioBar.module.scss';

const getFilledValues = (total: number, amount?: number) => {
	if (!amount || amount < 0) {
		return { percentage: 0, amount: 0 };
	}

	if (amount > total) {
		return { percentage: 100, amount };
	}

	return { percentage: (amount / total) * 100, amount };
};

const getEmptyValues = (total: number, amount?: number) => {
	if (!amount || amount < 0) {
		return { percentage: 100, amount: total };
	}
	if (amount > total) {
		return { percentage: 0, amount: 0 };
	}

	return { percentage: (1 - amount / total) * 100, amount: total - amount };
};

const getLabel = (errors: number, total: number, amount?: number) => {
	if (!amount && amount !== 0) {
		return (
			<div className={theme['tc-ratio-bar-counter']} data-testid="ratioBarCounterNA">
				<Trans i18nKey="tui-components:NA">
					<strong>N</strong>/A
				</Trans>
			</div>
		);
	}

	return (
		<div className={theme['tc-ratio-bar-counter']} data-testid="ratioBarCounter">
			<strong>{amount + errors}</strong>/{total}
		</div>
	);
};

type RadioBarProps = {
	amount?: number;
	errors?: number;
	hideLabel?: boolean;
	total: number;
};

export const RatioBar = ({ amount, total, errors = 0, hideLabel = false }: RadioBarProps) => {
	const filled = getFilledValues(total, amount);
	const error = getFilledValues(total, errors);
	const empty = getEmptyValues(total, amount ? amount + errors : undefined);

	return (
		<RatioBarComposition>
			<FilledLine percentage={filled.percentage} value={filled.amount} />
			<ErrorLine percentage={error.percentage} value={error.amount} />
			<EmptyLine percentage={empty.percentage} value={empty.amount} />
			{!hideLabel && getLabel(errors, total, amount)}
		</RatioBarComposition>
	);
};
