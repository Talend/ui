import React, { forwardRef, Ref } from 'react';
import { useTranslation } from 'react-i18next';

import classnames from 'classnames';
import { DataAttributes } from 'src/types';

import Dropdown from '../../Dropdown';
import { DropdownItemType } from '../../Dropdown/Dropdown';
import { SizedIcon } from '../../Icon';
import { StackHorizontal } from '../../Stack';
import { I18N_DOMAIN_DESIGN_SYSTEM } from '../../constants';
import BadgeButton from '../button/BadgeButton';
import BadgePrimitive, {
	BadgeDropdownItem,
	BadgePrimitiveProps,
} from '../primitive/BadgePrimitive';

import styles from './BadgeDropdown.module.scss';

// --------------------------------------------------
// Badge Dropdown button
// --------------------------------------------------

type BadgeDropdownButtonProps = {
	children?: string;
} & Partial<DataAttributes>;

// Note : need to use forwardRef and pass destructuring unknown parameters to be able using with dropdown component
const BadgeDropdownButton = forwardRef(
	({ children, ...rest }: BadgeDropdownButtonProps, ref: Ref<HTMLButtonElement>) => {
		return (
			<BadgeButton componentId="badgedropdown-button" ref={ref} {...rest}>
				<StackHorizontal gap="XS" as="span" align="center">
					{children}

					<span className={classnames(styles['badge-dropdown__button__caret'])}>
						<SizedIcon size="S" name="chevron-down" />
					</span>
				</StackHorizontal>
			</BadgeButton>
		);
	},
);

BadgeDropdownButton.displayName = 'BadgeDropdownButton';

// --------------------------------------------------
// Badge Dropdown
// --------------------------------------------------

/**
 * Return callback to map a Badge Item to a Dropdown compatible item.
 * @param setSelectedValue React.Dispatch action called when click on one Dropdown item
 * @returns Dropdown compatible item
 */
function mapBadgeItemToDropdownItem(onChange?: (selectedId: string) => void) {
	return (item: BadgeDropdownItem): DropdownItemType => ({
		type: 'button',
		label: item.label,
		onClick: () => {
			if (onChange) {
				onChange(item.id);
			}
		},
	});
}

export type BadgeDropdownProps = Omit<BadgePrimitiveProps, 'children'> & {
	/**
	 * Listener for item selection.
	 */
	onChange: (selectedId: string) => void;

	/**
	 * (Optional) ID of selected item. If not filled, first one is selected.
	 */
	selectedId?: string;

	/**
	 * List of items available in dropdown menu.
	 */
	value: BadgeDropdownItem[];
};

const BadgeDropdown = (props: BadgeDropdownProps) => {
	const { onChange, selectedId, value } = props;

	const { t } = useTranslation(I18N_DOMAIN_DESIGN_SYSTEM);

	const selectedValue = value.find(v => v.id === selectedId) || value[0];

	return (
		<BadgePrimitive {...props}>
			<Dropdown
				aria-label={t('BADGE_ARIA_lABEL_SELECT_ITEM', 'Select item')}
				items={value.map(mapBadgeItemToDropdownItem(onChange))}
				data-testid={props['data-testid']}
				data-test={props['data-test']}
			>
				<BadgeDropdownButton data-testid={props['data-testid']} data-test={props['data-test']}>
					{selectedValue?.label}
				</BadgeDropdownButton>
			</Dropdown>
		</BadgePrimitive>
	);
};

BadgeDropdown.displayName = 'BadgeDropdown';

export default BadgeDropdown;
