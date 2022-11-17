import React, { ReactNode } from 'react';
import classNames from 'classnames';

import styles from './Tooltip.component.module.scss';

export interface TooltipProps {
	title?: string;
	children: ReactNode;
}

export function Tooltip({ children, title }: TooltipProps): JSX.Element {
	return (
		<div className={classNames(styles['dataviz-tooltip'])}>
			<div className={classNames(styles['dataviz-tooltip__title'])}>{title}</div>
			{children}
		</div>
	);
}
