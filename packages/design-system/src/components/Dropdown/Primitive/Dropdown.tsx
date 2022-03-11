import React, { cloneElement, forwardRef, ReactElement, Ref } from 'react';
import { Menu, MenuButton, useMenuState } from 'reakit';
import { IconName } from '@talend/icons';
import DropdownButton from './DropdownButton';
import DropdownLink from './DropdownLink';
import DropdownShell from './DropdownShell';

type DropdownButtonType = {
	label: string;
	onClick: () => void;
	icon?: IconName;
};

type DropdownLinkType = {
	label: string;
	icon?: IconName;
	as?: ReactElement;
} & ({ href: string } | { to: string });

type DropdownPropsType = {
	children: ReactElement;
	items: (DropdownButtonType | DropdownLinkType)[];
};

const Dropdown = forwardRef(({ children, items }: DropdownPropsType, ref: Ref<HTMLDivElement>) => {
	const menu = useMenuState({
		animated: 250,
		gutter: 0,
		loop: true,
	});

	const buildList = () => {
		return items.map(entry => {
			if ('onClick' in entry) {
				const { label, ...rest } = entry;
				return (
					<DropdownButton {...rest} {...menu}>
						{label}
					</DropdownButton>
				);
			}

			const { label, ...rest } = entry;

			return (
				<DropdownLink {...rest} {...menu}>
					{label}
				</DropdownLink>
			);
		});
	};

	return (
		<>
			<MenuButton {...menu}>
				{disclosureProps => cloneElement(children, disclosureProps)}
			</MenuButton>
			<Menu {...menu} as={DropdownShell} aria-label="Example" ref={ref}>
				{buildList()}
			</Menu>
		</>
	);
});

export default Dropdown;
