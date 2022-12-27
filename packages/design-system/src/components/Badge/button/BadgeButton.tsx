import React, { forwardRef, Ref } from 'react';

import classnames from 'classnames';
import styles from './BadgeButton.module.scss';
import Clickable from '../../Clickable';

interface BadgeButtonProps {
	componentId?: string;
	children?: JSX.Element | string;
	onClick?: () => void;
}

const BadgeButton = forwardRef(
	({ componentId, children, onClick, ...rest }: BadgeButtonProps, ref: Ref<HTMLButtonElement>) => {
		return (
			<Clickable
				className={classnames(styles.badge__button)}
				data-testid={componentId}
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
