import React, { cloneElement, forwardRef, MouseEvent, ReactElement, Ref } from 'react';
import { Menu, MenuButton, useMenuState } from 'reakit';
// eslint-disable-next-line @talend/import-depth
import DropdownButton from './Primitive/DropdownButton';
import DropdownLink from './Primitive/DropdownLink';
import DropdownShell from './Primitive/DropdownShell';
import DropdownTitle from './Primitive/DropdownTitle';
import DropdownDivider from './Primitive/DropdownDivider';
import Clickable, { ClickableProps } from '../Clickable';
import { LinkableType } from '../Linkable';
import { DeprecatedIconNames } from '../../types';

type DropdownButtonType = Omit<ClickableProps, 'children' | 'as'> & {
	label: string;
	onClick: () => void;
	icon?: DeprecatedIconNames;
	type: 'button';
};

type DropdownLinkType = Omit<LinkableType, 'children'> & {
	label: string;
	type: 'link';
};

type DropdownLabelType = {
	type: 'title';
	label: string;
};

type DropdownDividerType = {
	type: 'divider';
};

type DropdownPropsType = {
	children: ReactElement<typeof Clickable>;
	items: (DropdownButtonType | DropdownLinkType | DropdownLabelType | DropdownDividerType)[];
	'aria-label': string;
};

const Dropdown = forwardRef(
	({ children, items, ...rest }: DropdownPropsType, ref: Ref<HTMLDivElement>) => {
		const menu = useMenuState({
			animated: 250,
			gutter: 4,
			loop: true,
		});

		return (
			<>
				<MenuButton {...menu} data-test="dropdown.button">
					{disclosureProps => cloneElement(children, disclosureProps)}
				</MenuButton>
				<Menu {...menu} as={DropdownShell} {...rest} ref={ref} data-test="dropdown.menu">
					{items.map((entry, index) => {
						if (entry.type === 'button') {
							const { label, ...entryRest } = entry;
							return (
								<DropdownButton
									{...entryRest}
									{...menu}
									onClick={(event: MouseEvent<HTMLButtonElement> | KeyboardEvent) => {
										menu.hide();
										entry.onClick(event);
									}}
									key={`${label}-${index}`}
									id={`${label}-${index}`}
									data-test="dropdown.menuitem"
								>
									{label}
								</DropdownButton>
							);
						}

						if (entry.type === 'title') {
							const { label } = entry;
							return (
								<DropdownTitle key={`${label}-${index}`} data-test="dropdown.menuitem">
									{label}
								</DropdownTitle>
							);
						}

						if (entry.type === 'divider') {
							return (
								<DropdownDivider {...menu} key={`divider-${index}`} data-test="dropdown.menuitem" />
							);
						}

						const { label, as, type, ...entryRest } = entry;
						return (
							<DropdownLink
								as={as}
								{...entryRest}
								{...menu}
								key={`${label}-${index}`}
								id={`${label}-${index}`}
								onClick={(event: MouseEvent<HTMLAnchorElement>) => {
									menu.hide();
									if (entry.onClick) {
										entry.onClick(event);
									}
								}}
								data-test="dropdown.menuitem"
							>
								{label}
							</DropdownLink>
						);
					})}
				</Menu>
			</>
		);
	},
);

Dropdown.displayName = 'Dropdown';

export default Dropdown;
