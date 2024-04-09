import { ReactNode } from 'react';

import classNames from 'classnames';

import { Tooltip } from '@talend/design-system/lib/components/Tooltip';

import styles from './RatioBar.module.scss';

const minPercentage = 5;

type RadioBarLineProps = {
	percentage: number;
	value: number;
	tooltipLabel?: string;
	className: string;
	dataTestId?: string;
	dataFeature?: string | null;
	onClick?: any;
};

export function RatioBarLine({
	percentage,
	tooltipLabel,
	className,
	value,
	dataFeature,
	onClick,
	dataTestId,
}: RadioBarLineProps) {
	const canGrow = percentage >= minPercentage;

	if (!value || value < 0) return null;

	function onKeyDown(event: any) {
		switch (event.key) {
			case 'Enter':
				onClick(event);
				break;
			case ' ':
			case 'Spacebar':
				event.preventDefault(); // prevent scroll with space
				event.stopPropagation();
				onClick(event);
				break;
			default:
				break;
		}
	}

	const content = (
		<div
			className={classNames(
				styles['tc-ratio-bar-line'],
				{
					[styles['tc-ratio-bar-line-grow']]: canGrow,
				},
				className,
			)}
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

export const RatioBarComposition = ({ children }: { children: ReactNode }) => (
	<div className={styles['tc-ratio-bar']} data-testid="ratio-bar">
		{children}
	</div>
);
