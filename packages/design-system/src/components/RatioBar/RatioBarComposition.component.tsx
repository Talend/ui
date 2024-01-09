import type { KeyboardEvent, MouseEvent, ReactNode } from 'react';

import classnames from 'classnames';

import { Tooltip } from '../Tooltip';

import theme from './RatioBar.module.scss';

const minPercentage = 5;

type RadioBarLineProps = {
	className: string;
	dataFeature?: string | null;
	dataTestId?: string;
	onClick?: ((event: MouseEvent<HTMLElement>) => void) | null;
	percentage: number;
	tooltipLabel?: string;
	value: number;
};

export const RatioBarLine = ({
	className,
	dataFeature,
	dataTestId,
	onClick,
	percentage,
	tooltipLabel,
	value,
}: RadioBarLineProps) => {
	const canGrow = percentage >= minPercentage;

	if (!value || value < 0) return null;

	const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
		switch (event.key) {
			case 'Enter':
				//@ts-ignore
				onClick?.(event);
				break;
			case ' ':
			case 'Spacebar':
				event.preventDefault(); // prevent scroll with space
				event.stopPropagation();
				//@ts-ignore
				onClick?.(event);
				break;
			default:
				break;
		}
	};

	const content = (
		<div
			className={classnames(theme['tc-ratio-bar-line'], className, {
				[theme['tc-ratio-bar-line-grow']]: canGrow,
			})}
			tabIndex={0}
			style={{
				flexBasis: `${Math.max(percentage, minPercentage)}%`,
			}}
			data-testid={dataTestId}
			data-test={dataTestId}
			role={onClick ? 'button' : undefined}
			data-feature={dataFeature}
			onClick={e => onClick?.(e)}
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
};

export const RatioBarComposition = ({ children }: { children: ReactNode }) => {
	return (
		<div data-testid="rationBar" className={theme['tc-ratio-bar']}>
			{children}
		</div>
	);
};
