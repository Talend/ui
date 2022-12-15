import React, { forwardRef, Ref, useState } from 'react';
import { ButtonTertiary } from '../../Button';
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
) {
	return (item: BadgeDropdownItem): DropdownItemType => ({
		type: 'button',
		label: item.label,
		onClick: () => setSelectedValue(item),
	});
}

export type BadgeDropdownProps = Omit<BadgePrimitiveProps, 'children' | 'withDivider'> & {
	selectedId?: string;
	value: BadgeDropdownItem[];
};

const BadgeDropdown = forwardRef((props: BadgeDropdownProps, ref: Ref<HTMLSpanElement>) => {
	const { selectedId, value } = props;

	const [selectedValue, setSelectedValue] = useState(
		selectedId ? value?.find(v => v.id === selectedId) : value?.[0],
	);

	return (
		<BadgePrimitive {...props} ref={ref} withDivider>
			{/* TODO BADGE - replace & translate Open */}
			<Dropdown aria-label="Open" items={value.map(mapBadgeItemToDropdownItem(setSelectedValue))}>
				<ButtonTertiary isDropdown onClick={noop} size="S">
					{selectedValue?.label}
				</ButtonTertiary>
			</Dropdown>
		</BadgePrimitive>
	);
});

BadgeDropdown.displayName = 'BadgeDropdown';

export default BadgeDropdown;
