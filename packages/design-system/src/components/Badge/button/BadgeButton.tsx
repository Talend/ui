import React, { forwardRef, Ref } from 'react';

import classnames from 'classnames';
import styles from './BadgeButton.module.scss';
import Clickable from '../../Clickable';
import { DataAttributes } from 'src/types';

type BadgeButtonProps = {
	/**
	 * Component ID used as key and for data-testid.
	 */
	componentId?: string;

	/**
	 * (optional) Element to display in button.
	 */
	children?: JSX.Element | string;

	/**
	 * (optional) Button click handler.
	 */
	onClick?: () => void;
} & Partial<DataAttributes>;

const BadgeButton = forwardRef(
	({ componentId, children, onClick, ...rest }: BadgeButtonProps, ref: Ref<HTMLButtonElement>) => {
		const defaultTestId = 'badge-button';

		return (
			<Clickable
				className={classnames(styles.badge__button)}
				data-testid={
					rest['data-testid'] ? `${rest['data-testid']}.${defaultTestId}` : defaultTestId
				}
				data-test={rest['data-testid'] ? `${rest['data-testid']}.${defaultTestId}` : defaultTestId}
				key={componentId}
				onClick={onClick}
				ref={ref}
				{...rest}
			>
				{children}
			</Clickable>
		);
	},
);

BadgeButton.displayName = 'BadgeButton';

export default BadgeButton;
