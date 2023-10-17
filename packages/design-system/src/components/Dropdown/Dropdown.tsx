import { cloneElement, MouseEvent, ReactElement, useEffect, useState } from 'react';

import {
	useDismiss,
	useInteractions,
	useFloating,
	autoUpdate,
	flip,
	shift,
} from '@floating-ui/react';

import { DataAttributes, DeprecatedIconNames } from '../../types';
import { Clickable, ClickableProps } from '../Clickable';
import { LinkableType } from '../Linkable';
import DropdownDivider from './Primitive/DropdownDivider';
import DropdownLink from './Primitive/DropdownLink';
import DropdownShell from './Primitive/DropdownShell';
import DropdownTitle from './Primitive/DropdownTitle';
import { DropdownButton } from './Primitive/DropdownButton';
import { randomUUID } from '@talend/utils';

type DropdownButtonType = Omit<ClickableProps, 'children'> & {
	label: string;
	onClick: () => void;
	icon?: DeprecatedIconNames;
	type: 'button';
	checked?: boolean;
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

export const Dropdown = ({
	children,
	'data-test': dataTest,
	'data-testid': dataTestId,
	items,
	...rest
}: DropdownPropsType) => {
	const [isOpen, setIsOpen] = useState(false);
	const [itemIds, setItemIds] = useState<string[]>(items.map(() => randomUUID()));

	useEffect(() => {
		setItemIds(items.map(() => randomUUID()));
	}, [items]);

	const floating = useFloating({
		placement: 'bottom-start',
		open: isOpen,
		onOpenChange: setIsOpen,
		middleware: [flip(), shift()],
		whileElementsMounted: autoUpdate,
	});
	const dismiss = useDismiss(floating.context, {
		escapeKey: true,
		outsidePressEvent: 'mousedown',
	});
	const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);
	const menuButtonTestId = dataTestId ? `${dataTestId}.dropdown.button` : 'dropdown.button';
	const menuTestId = dataTestId ? `${dataTestId}.dropdown.menu` : 'dropdown.menu';
	const menuItemTestId = dataTestId ? `${dataTestId}.dropdown.menuitem` : 'dropdown.menuitem';
	const menuButtonTest = dataTest ? `${dataTest}.dropdown.button` : 'dropdown.button';
	const menuTest = dataTest ? `${dataTest}.dropdown.menu` : 'dropdown.menu';
	const menuItemTest = dataTest ? `${dataTest}.dropdown.menuitem` : 'dropdown.menuitem';

	return (
		<>
			{cloneElement(children as any, {
				onClick: () => setIsOpen(!isOpen),
				'aria-pressed': `${isOpen}`,
				'data-testid': menuButtonTestId,
				'data-test': menuButtonTest,
				'aria-expanded': `${isOpen}`,
				ref: floating.refs.setReference,
				...getReferenceProps(),
			})}
			<DropdownShell
				{...rest}
				ref={floating.refs.setFloating}
				onClick={() => setIsOpen(false)}
				style={{ ...floating.floatingStyles, display: isOpen ? 'block' : 'none' }}
				data-testid={menuTestId}
				data-test={menuTest}
				{...getFloatingProps()}
			>
				{items.map((entry, index) => {
					const uuid = itemIds[index];
					if (entry.type === 'button') {
						const { label, ...entryRest } = entry;
						const id = `${label}-${index}`;
						return (
							<DropdownButton
								{...entryRest}
								// {...menu}
								onClick={(event: MouseEvent<HTMLButtonElement> | KeyboardEvent) => {
									entry.onClick(event);
									setIsOpen(false);
								}}
								key={uuid}
								tabIndex={0}
								id={uuid}
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
								key={uuid}
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
								// {...menu}
								key={uuid}
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
							// {...menu}
							key={uuid}
							id={uuid}
							onClick={(event: MouseEvent<HTMLAnchorElement>) => {
								setIsOpen(false);
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
			</DropdownShell>
		</>
	);
};

Dropdown.displayName = 'Dropdown';
