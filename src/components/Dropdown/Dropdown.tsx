import React from 'react';
import * as ReactIs from 'react-is';
import { useMenuState, MenuSeparator } from 'reakit/Menu';

import * as S from './Dropdown.style';

export type DropdownProps = {
	/** Dropdown menu items */
	items: any;
};

const Dropdown: React.FC<DropdownProps> = React.forwardRef(
	({ children, items = [], ...props }: DropdownProps, ref) => {
		const menu = useMenuState({
			animated: 250,
			gutter: 0,
			loop: true,
			placement: 'bottom-start',
		});
		const { 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, ...rest } = props;
		return (
			<>
				<S.Button {...menu} ref={ref} {...rest}>
					{children}
					{items.length ? <S.ButtonIcon name="caret" /> : null}
				</S.Button>
				{items.length ? (
					<S.Menu {...menu} aria-label={ariaLabel} aria-labelledby={ariaLabelledby}>
						<S.AnimatedMenu>
							{items.map((item, index) =>
								ReactIs.isFragment(item) &&
								React.Children.toArray(item.props.children).length === 0 ? (
									<MenuSeparator />
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

Dropdown.Separator = React.Fragment;

export default Dropdown;
