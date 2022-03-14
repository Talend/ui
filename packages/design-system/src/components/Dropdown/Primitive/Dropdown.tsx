import React, { cloneElement, forwardRef, ReactElement, Ref } from 'react';
import { Menu, MenuButton, useMenuState } from 'reakit';
import { IconName } from '@talend/icons';
import DropdownButton from './DropdownButton';
import DropdownLink from './DropdownLink';
import DropdownShell from './DropdownShell';
import { LinkableType } from '../../Linkable';
import Clickable from '../../Clickable';

type DropdownButtonType = {
	label: string;
	onClick: () => void;
	icon?: IconName;
	type: 'button';
};

type DropdownLinkType = Omit<LinkableType, 'children'> & {
	label: string;
	type: 'link';
};

type DropdownPropsType = {
	children: ReactElement<typeof Clickable>;
	items: (DropdownButtonType | DropdownLinkType)[];
};

const Dropdown = forwardRef(({ children, items }: DropdownPropsType, ref: Ref<HTMLDivElement>) => {
	const menu = useMenuState({
		animated: 250,
		gutter: 0,
		loop: true,
	});

	return (
		<>
			<MenuButton {...menu}>
				{disclosureProps => cloneElement(children, disclosureProps)}
			</MenuButton>
			<Menu {...menu} as={DropdownShell} aria-label="Example" ref={ref}>
				{items.map(entry => {
					if (entry.type === 'button') {
						const { label, ...rest } = entry;
						return (
							<DropdownButton {...rest} {...menu} key={entry.label}>
								{label}
							</DropdownButton>
						);
					}

					const { label, as, ...rest } = entry;

					return (
						<DropdownLink as={as} {...rest} {...menu} key={entry.label}>
							{label}
						</DropdownLink>
					);
				})}
			</Menu>
		</>
	);
});

export default Dropdown;
