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
import { DataAttributes, DeprecatedIconNames } from '../../types';

type DropdownButtonType = Omit<ClickableProps, 'children' | 'as'> & {
	label: string;
	onClick: () => void;
	icon?: DeprecatedIconNames;
	type: 'button';
} & DataAttributes;

type DropdownLinkType = Omit<LinkableType, 'children'> & {
	label: string;
	type: 'link';
} & DataAttributes;

type DropdownLabelType = {
	type: 'title';
	label: string;
};

type DropdownDividerType = {
	type: 'divider';
};

export type DropdownItemType =
	| DropdownButtonType
	| DropdownLinkType
	| DropdownLabelType
	| DropdownDividerType;

export type DropdownPropsType = {
	children: ReactElement<typeof Clickable>;
	items: DropdownItemType[];
	'aria-label': string;
} & Partial<DataAttributes>;

const Dropdown = forwardRef(
	(
		{
			children,
			'data-test': dataTest,
			'data-testid': dataTestId,
			items,
			...rest
		}: DropdownPropsType,
		ref: Ref<HTMLDivElement>,
	) => {
		const menu = useMenuState({
			animated: 250,
			gutter: 4,
			loop: true,
		});

		const menuButtonTestId = dataTestId ? `${dataTestId}.dropdown.button` : 'dropdown.button';
		const menuTestId = dataTestId ? `${dataTestId}.dropdown.menu` : 'dropdown.menu';
		const menuItemTestId = dataTestId ? `${dataTestId}.dropdown.menuitem` : 'dropdown.menuitem';
		const menuButtonTest = dataTest ? `${dataTest}.dropdown.button` : 'dropdown.button';
		const menuTest = dataTest ? `${dataTest}.dropdown.menu` : 'dropdown.menu';
		const menuItemTest = dataTest ? `${dataTest}.dropdown.menuitem` : 'dropdown.menuitem';

		return (
			<>
				<MenuButton {...menu} data-testid={menuButtonTestId} data-test={menuButtonTest}>
					{disclosureProps => cloneElement(children, disclosureProps)}
				</MenuButton>
				<Menu
					{...menu}
					as={DropdownShell}
					{...rest}
					ref={ref}
					data-testid={menuTestId}
					data-test={menuTest}
				>
					{items.map((entry, index) => {
						if (entry.type === 'button') {
							const { label, ...entryRest } = entry;
							const id = `${label}-${index}`;
							return (
								<DropdownButton
									{...entryRest}
									{...menu}
									onClick={(event: MouseEvent<HTMLButtonElement> | KeyboardEvent) => {
										menu.hide();
										entry.onClick(event);
									}}
									key={id}
									id={id}
									data-testid={`${menuItemTestId}.${id}`}
									data-test={`${menuItemTest}.${id}`}
								>
									{label}
								</DropdownButton>
							);
						}

						if (entry.type === 'title') {
							const { label } = entry;
							const id = `${label}-${index}`;
							return (
								<DropdownTitle
									key={id}
									data-testid={`${menuItemTestId}.${id}`}
									data-test={`${menuItemTest}.${id}`}
								>
									{label}
								</DropdownTitle>
							);
						}

						if (entry.type === 'divider') {
							const id = `divider-${index}`;
							return (
								<DropdownDivider
									{...menu}
									key={id}
									data-testid={`${menuItemTestId}.${id}`}
									data-test={`${menuItemTest}.${id}`}
								/>
							);
						}

						const { label, as, type, ...entryRest } = entry;
						const id = `${label}-${index}`;
						return (
							<DropdownLink
								as={as}
								{...entryRest}
								{...menu}
								key={id}
								id={id}
								onClick={(event: MouseEvent<HTMLAnchorElement>) => {
									menu.hide();
									if (entry.onClick) {
										entry.onClick(event);
									}
								}}
								data-testid={`${menuItemTestId}.${id}`}
								data-test={`${menuItemTest}.${id}`}
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
