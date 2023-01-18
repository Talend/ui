import React, { forwardRef, Ref } from 'react';

import classNames from 'classnames';
import { MenuItem, MenuItemProps } from 'reakit';

// eslint-disable-next-line @talend/import-depth
import { IconNameWithSize } from '@talend/icons/dist/typeUtils';

import { DeprecatedIconNames } from '../../../types';
import Clickable, { ClickableProps } from '../../Clickable';
import { getIconWithDeprecatedSupport } from '../../Icon/DeprecatedIconHelper';

import styles from './DropdownEntry.module.scss';

export type DropdownButtonType = Omit<ClickableProps, 'as'> &
	MenuItemProps & { size?: 'M' | 'S'; icon?: DeprecatedIconNames | IconNameWithSize<'M' | 'S'> };

const DropdownButton = forwardRef(
	({ children, icon, size = 'M', ...props }: DropdownButtonType, ref: Ref<HTMLButtonElement>) => {
		return (
			<MenuItem {...props} as={Clickable} className={styles.dropdownEntry} ref={ref}>
				{icon && (
					<span className={classNames(styles.buttonIcon, { [styles.buttonIconS]: size === 'S' })}>
						{getIconWithDeprecatedSupport({
							iconSrc: icon,
							size,
							['data-test']: 'button.icon.before',
						})}
					</span>
				)}
				<span className={styles.buttonContent}>{children}</span>
			</MenuItem>
		);
	},
);

DropdownButton.displayName = 'DropdownButton';

export default DropdownButton;
