import React from 'react';
import { StyledProps } from 'styled-components';
import * as ReactIs from 'react-is';
import { BoxProps, useMenuState } from 'reakit';

import Button from '../Button';

import * as S from './Dropdown.style';

export type DropdownProps = BoxProps &
	StyledProps<any> & {
		/** Dropdown menu items */
		items: any;
	};

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
				<S.Button as={Button} ref={ref} {...menu} {...rest}>
					{children}
					{items.length ? <S.ButtonIcon name="caret" /> : null}
				</S.Button>
				{items.length ? (
					<S.Menu {...menu} aria-label={ariaLabel} aria-labelledby={ariaLabelledby}>
						<S.AnimatedMenu>
							{items.map((item: React.ReactElement<any>, index: number) =>
								ReactIs.isFragment(item) &&
								React.Children.toArray(item.props.children).length === 0 ? (
									<S.MenuSeparator />
								) : (
									<S.MenuItem {...menu} {...item.props} key={index}>
										{itemProps => React.cloneElement(item, itemProps)}
									</S.MenuItem>
								),
							)}
						</S.AnimatedMenu>
					</S.Menu>
				) : null}
			</>
		);
	},
);

export default Dropdown;
