import React from 'react';
import { useMenuState } from 'reakit/Menu';

import * as S from './Dropdown.style';

export type DropdownProps = {
	/** Dropdown menu items */
	items: any;
};

const Dropdown: React.FC<DropdownProps> = React.forwardRef(
	({ children, items = [], ...props }: DropdownProps, ref) => {
		const menu = useMenuState({
			gutter: 0,
			loop: true,
			placement: 'bottom-start',
		});
		const { 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, ...rest } = props;
		return (
			<>
				<S.Button {...menu} {...rest} ref={ref}>
					{children} {items.length ? <S.ButtonIcon name="caret" /> : null}
				</S.Button>
				{items.length ? (
					<S.Menu {...menu} aria-label={ariaLabel} aria-labelledby={ariaLabelledby}>
						{items.map((item, index) => (
							<S.MenuItem {...menu} {...item.props} key={index}>
								{itemProps => React.cloneElement(item, itemProps)}
							</S.MenuItem>
						))}
					</S.Menu>
				) : null}
			</>
		);
	},
);

export default Dropdown;
