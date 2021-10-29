import React from 'react';
import { StyledProps } from 'styled-components';
import { BoxProps, useMenuState } from 'reakit';

import Link, { LinkProps } from '../Link/Link';
import Button from '../Button';

import * as S from './Dropdown.style';

type DividerType = { divider: boolean };
type LinkType = Omit<LinkProps, 'children'> & {
	label: string;
};
type ButtonType = Omit<LinkType, 'href'>;
type MenuItemProps = DividerType | LinkType | ButtonType;

export type DropdownProps = BoxProps &
	StyledProps<any> & {
		/** Dropdown menu items */
		items: MenuItemProps[];
	};

function convertItem(item: ButtonType | LinkType) {
	return 'href' in item ? (
		<Link iconBefore={item.icon} {...item}>
			{item.label}
		</Link>
	) : (
		<Button {...item}>{item.label}</Button>
	);
}

const Dropdown: React.FC<DropdownProps> = React.forwardRef(
	({ children, items = [], ...props }: DropdownProps, ref) => {
		const menu = useMenuState({
			animated: 250,
			gutter: 0,
			loop: true,
		});
		const { 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, ...rest } = props;

		return (
			<>
				<S.Button as={Button} data-test="dropdown.button" {...menu} {...rest} ref={ref}>
					{children}
					{items.length ? <S.ButtonIcon name="talend-caret-down" /> : null}
				</S.Button>
				{items.length ? (
					<S.Menu {...menu} aria-label={ariaLabel} aria-labelledby={ariaLabelledby}>
						<S.AnimatedMenu data-test="dropdown.menu" {...menu}>
							{items.map((item: MenuItemProps, index: number) => {
								if ('divider' in item) {
									return <S.MenuSeparator key={`separator-${index}`} />;
								}

								const LinkOrButton = convertItem(item);
								return (
									<S.MenuItem
										data-test="dropdown.menuitem"
										{...LinkOrButton.props}
										key={`entry-${index}`}
										{...menu}
									>
										{itemProps => React.cloneElement(LinkOrButton, itemProps)}
									</S.MenuItem>
								);
							})}
						</S.AnimatedMenu>
					</S.Menu>
				) : null}
			</>
		);
	},
);

export default Dropdown;
