import { forwardRef, Ref } from 'react';

import classnames from 'classnames';
import styles from './BadgeButton.module.scss';
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
	(
		{
			children,
			componentId,
			'data-testid': dataTestId,
			'data-test': dataTest,
			onClick,
			...rest
		}: BadgeButtonProps,
		ref: Ref<HTMLButtonElement>,
	) => {
		const defaultTestId = 'badge-button';

		return (
			<button
				className={classnames(styles.badge__button, styles.clickable)}
				data-testid={dataTestId ? `${dataTestId}.${defaultTestId}` : defaultTestId}
				data-test={dataTest ? `${dataTest}.${defaultTestId}` : defaultTestId}
				key={componentId}
				onClick={onClick}
				ref={ref}
				{...rest}
			>
				{children}
			</button>
		);
	},
);

BadgeButton.displayName = 'BadgeButton';

export default BadgeButton;
