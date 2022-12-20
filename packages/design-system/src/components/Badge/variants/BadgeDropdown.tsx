import React, { forwardRef, Ref, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonTertiary } from '../../Button';
import { I18N_DOMAIN_DESIGN_SYSTEM } from '../../constants';
import Dropdown from '../../Dropdown';
import { DropdownItemType } from '../../Dropdown/Dropdown';
import BadgePrimitive, {
	BadgeDropdownItem,
	BadgePrimitiveProps,
} from '../primitive/BadgePrimitive';

const noop = () => {};

/**
 * Return callback to map a Badge Item to a Dropdown compatible item.
 * @param setSelectedValue React.Dispatch action called when click on one Dropdown item
 * @returns Dropdown compatible item
 */
function mapBadgeItemToDropdownItem(
	setSelectedValue: React.Dispatch<React.SetStateAction<BadgeDropdownItem | undefined>>,
	onChange: (selectedId: string) => void,
) {
	return (item: BadgeDropdownItem): DropdownItemType => ({
		type: 'button',
		label: item.label,
		onClick: () => {
			setSelectedValue(item);
			onChange(item.id);
		},
	});
}

export type BadgeDropdownProps = Omit<BadgePrimitiveProps, 'children' | 'withDivider'> & {
	selectedId?: string;
	value: BadgeDropdownItem[];
	onChange: (selectedId: string) => void;
};

const BadgeDropdown = forwardRef((props: BadgeDropdownProps, ref: Ref<HTMLSpanElement>) => {
	const { isReadOnly, onChange, selectedId, value } = props;

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
				<ButtonTertiary disabled={isReadOnly} isDropdown onClick={noop} size="S">
					{selectedValue?.label}
				</ButtonTertiary>
			</Dropdown>
		</BadgePrimitive>
	);
});

BadgeDropdown.displayName = 'BadgeDropdown';

export default BadgeDropdown;
