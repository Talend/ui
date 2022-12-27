import React, { forwardRef, Ref, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { I18N_DOMAIN_DESIGN_SYSTEM } from '../../constants';
import Dropdown from '../../Dropdown';
import { DropdownItemType } from '../../Dropdown/Dropdown';
import { SizedIcon } from '../../Icon';
import { StackHorizontal } from '../../Stack';

import BadgePrimitive, {
	BadgeDropdownItem,
	BadgePrimitiveProps,
} from '../primitive/BadgePrimitive';

import classnames from 'classnames';
import styles from './BadgeDropdown.module.scss';
import BadgeButton from '../button/BadgeButton';

// --------------------------------------------------
// Badge Dropdown button
// --------------------------------------------------

interface BadgeDropdownButtonProps {
	children?: string;
}

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
function mapBadgeItemToDropdownItem(
	setSelectedValue: React.Dispatch<React.SetStateAction<BadgeDropdownItem | undefined>>,
	onChange?: (selectedId: string) => void,
) {
	return (item: BadgeDropdownItem): DropdownItemType => ({
		type: 'button',
		label: item.label,
		onClick: () => {
			setSelectedValue(item);

			if (onChange) {
				onChange(item.id);
			}
		},
	});
}

export type BadgeDropdownProps = Omit<BadgePrimitiveProps, 'children'> & {
	onChange?: (selectedId: string) => void;
	selectedId?: string;
	value: BadgeDropdownItem[];
};

const BadgeDropdown = forwardRef((props: BadgeDropdownProps, ref: Ref<HTMLSpanElement>) => {
	const { onChange, selectedId, value } = props;

	const { t } = useTranslation(I18N_DOMAIN_DESIGN_SYSTEM);

	const [selectedValue, setSelectedValue] = useState(
		selectedId ? value?.find(v => v.id === selectedId) : value?.[0],
	);

	return (
		<BadgePrimitive {...props} ref={ref} withDivider>
			<Dropdown
				aria-label={t('BADGE_ARIA_lABEL_SELECT_ITEM', 'Select item')}
				items={value.map(mapBadgeItemToDropdownItem(setSelectedValue, onChange))}
			>
				<BadgeDropdownButton>{selectedValue?.label}</BadgeDropdownButton>
			</Dropdown>
		</BadgePrimitive>
	);
});

BadgeDropdown.displayName = 'BadgeDropdown';

export default BadgeDropdown;
