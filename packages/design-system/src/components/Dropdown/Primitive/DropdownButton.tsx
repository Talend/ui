import { forwardRef, Ref } from 'react';
import classNames from 'classnames';
import { MenuItem, MenuItemProps } from 'reakit';
// eslint-disable-next-line @talend/import-depth
import { IconNameWithSize } from '@talend/icons/dist/typeUtils';

import { DeprecatedIconNames } from '../../../types';
import Clickable, { ClickableProps } from '../../Clickable';
import { SizedIcon } from '../../Icon';
import { getIconWithDeprecatedSupport } from '../../Icon/DeprecatedIconHelper';

import styles from './DropdownEntry.module.scss';

export type DropdownButtonType = Omit<ClickableProps, 'as'> &
	MenuItemProps & { icon?: DeprecatedIconNames | IconNameWithSize<'M'>; checked?: boolean };

const DropdownButton = forwardRef(
	({ children, icon, checked, ...props }: DropdownButtonType, ref: Ref<HTMLButtonElement>) => {
		return (
			<MenuItem
				{...props}
				as={Clickable}
				className={styles.dropdownEntry}
				ref={ref}
				aria-selected={checked}
			>
				{icon && (
					<span className={styles.buttonIcon}>
						{getIconWithDeprecatedSupport({
							iconSrc: icon,
							size: 'M',
							['data-test']: 'button.icon.before',
						})}
					</span>
				)}
				<span className={classNames(styles.buttonContent, { checked })}>{children}</span>
				{checked && (
					<SizedIcon
						name="check"
						size="M"
						data-test="dropdown.menuItem.Button.checked"
						data-testid="dropdown.menuItem.Button.checked"
					/>
				)}
			</MenuItem>
		);
	},
);

DropdownButton.displayName = 'DropdownButton';

export default DropdownButton;
