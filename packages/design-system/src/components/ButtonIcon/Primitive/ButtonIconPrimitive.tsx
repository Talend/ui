import React from 'react';
import classnames from 'classnames';
import { IconName } from '@talend/icons';
import Tooltip from '../../Tooltip';
import { Icon } from '../../Icon/Icon';
import Loading from '../../Loading';

import styles from './ButtonIcon.module.scss';

export const variants = {
	default: 'default',
	floating: 'floating',
	toggle: 'toggle',
};

type ToggleTypes = {
	type: 'toggle';
	isActive: boolean;
	size: 'M' | 'S';
};

type FloatingTypes = {
	type: 'floating';
	size: 'M' | 'S';
};

type DefaultTypes = {
	type: 'default';
	size: 'M' | 'S' | 'XS';
};

export type ButtonIconProps = {
	icon: IconName;
	children: string;
	isLoading: boolean;
	disabled: boolean;
	onClick: () => void;
} & (ToggleTypes | FloatingTypes | DefaultTypes);

const Status = React.forwardRef(
	(
		{ children, icon, size, isLoading, disabled, type, onClick, ...rest }: ButtonIconProps,
		ref: React.Ref<HTMLButtonElement>,
	) => {
		const picto = (
			<span className={styles.buttonIcon__icon} aria-hidden>
				{!isLoading && icon && <Icon name={icon} />}
				{isLoading && <Loading />}
			</span>
		);
		return (
			<Tooltip title={children}>
				<button {...rest} className={classnames(styles.buttonIcon)} ref={ref}>
					{picto}
				</button>
			</Tooltip>
		);
	},
);

export default Status;
