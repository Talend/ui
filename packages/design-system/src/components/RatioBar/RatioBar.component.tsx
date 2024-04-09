import { ReactNode } from 'react';

import { RatioBarComposition } from './RatioBarComposition.component';
import { EmptyLine, ErrorLine, FilledLine } from './RatioBarLines.component';

import styles from './RatioBar.module.scss';

const getFilledValues = (amount: number, total: number) => {
	if (!amount || amount < 0) {
		return { percentage: 0, amount: 0 };
	}

	if (amount > total) {
		return { percentage: 100, amount };
	}

	return { percentage: (amount / total) * 100, amount };
};

const getEmptyValues = (amount: number, total: number) => {
	if (!amount || amount < 0) {
		return { percentage: 100, amount: total };
	}

	if (amount > total) {
		return { percentage: 0, amount: 0 };
	}

	return { percentage: (1 - amount / total) * 100, amount: total - amount };
};

const getLabel = (
	errors: number,
	total: number,
	amount?: number,
	notApplicableLabel?: ReactNode,
) => {
	if (!amount && amount !== 0) {
		return (
			<div className={styles['tc-ratio-bar-counter']} data-testid="ratio-bar-counter">
				{notApplicableLabel || (
					<>
						<strong>N</strong> / A
					</>
				)}
			</div>
		);
	}

	return (
		<div className={styles['tc-ratio-bar-counter']} data-testid="ratio-bar-counter">
			<strong>{amount + errors}</strong>/{total}
		</div>
	);
};

type RatioBarProps = {
	amount?: number;
	errors?: number;
	hideLabel?: boolean;
	notApplicableLabel?: ReactNode;
	total: number;
};

export const RatioBar = ({
	amount,
	errors = 0,
	hideLabel = false,
	notApplicableLabel,
	total,
}: RatioBarProps) => {
	const filled = getFilledValues(amount || 0, total);
	const error = getFilledValues(errors, total);
	const empty = getEmptyValues((amount || 0) + errors, total);

	return (
		<RatioBarComposition>
			<FilledLine percentage={filled.percentage} value={filled.amount} />
			<ErrorLine percentage={error.percentage} value={error.amount} />
			<EmptyLine percentage={empty.percentage} value={empty.amount} />
			{!hideLabel && getLabel(errors, total, amount, notApplicableLabel)}
		</RatioBarComposition>
	);
};
