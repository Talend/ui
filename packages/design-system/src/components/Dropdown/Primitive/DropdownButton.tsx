import React, { forwardRef, Ref } from 'react';
import { MenuItem, MenuItemProps } from 'reakit';
// eslint-disable-next-line @talend/import-depth
import { IconName } from '@talend/icons/dist/typeUtils';
import { ClickableProps } from '../../Clickable';

import styles from './DropdownEntry.module.scss';
import { Icon } from '../../Icon/Icon';
import ButtonListing from '../../Clickable/variants/ButtonListing';

export type DropdownButtonType = Omit<ClickableProps, 'as'> & MenuItemProps & { icon?: IconName };

const DropdownButton = forwardRef(
	({ children, icon, ...props }: DropdownButtonType, ref: Ref<HTMLButtonElement>) => {
		return (
			<MenuItem {...props} as={ButtonListing} ref={ref}>
				{icon && <Icon name={icon} data-test="button.icon.before" className={styles.buttonIcon} />}
				<span className={styles.buttonContent}>{children}</span>
			</MenuItem>
		);
	},
);

export default DropdownButton;
