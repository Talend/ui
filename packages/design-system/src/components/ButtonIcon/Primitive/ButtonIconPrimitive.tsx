import React, { ButtonHTMLAttributes } from 'react';
import { Button } from 'reakit';
import classnames from 'classnames';
import { IconName } from '@talend/icons';
import Tooltip from '../../Tooltip';
import { Icon } from '../../Icon/Icon';
import Loading from '../../Loading';

import styles from './ButtonIcon.module.scss';

type AvailableSizes = 'M' | 'S' | 'XS';

type CommonTypes = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & {
	icon: IconName;
	children: string;
	isLoading?: boolean;
	onClick: () => void;
};

export type ToggleTypes = CommonTypes & {
	variant: 'toggle';
	isActive: boolean;
	size?: Omit<AvailableSizes, 'XS'>;
};

export type FloatingTypes = CommonTypes & {
	variant: 'floating';
	size?: Omit<AvailableSizes, 'XS'>;
};

export type DefaultTypes = CommonTypes & {
	variant: 'default';
	size?: AvailableSizes;
};

export type ButtonIconProps = ToggleTypes | FloatingTypes | DefaultTypes;

const Status = React.forwardRef(
	(
		{ children, icon, size = 'M', isLoading = false, variant, onClick, ...rest }: ButtonIconProps,
		ref: React.Ref<HTMLButtonElement>,
	) => {
		return (
			<Tooltip title={children}>
				<Button {...rest} className={classnames(styles.buttonIcon)} ref={ref}>
					<span className={styles.buttonIcon__icon} aria-hidden>
						{!isLoading && icon && <Icon name={icon} />}
						{isLoading && <Loading />}
					</span>
				</Button>
			</Tooltip>
		);
	},
);

export default Status;
