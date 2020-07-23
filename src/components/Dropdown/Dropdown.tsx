import React from 'react';
import { useMenuState } from 'reakit/Menu';

import * as S from './Dropdown.style';

export type DropdownProps = {
	/** Dropdown menu items */
	items: object;
};

const Dropdown = React.forwardRef(({ children, items, ...props }, ref) => {
	const menu = useMenuState({
		gutter: 0,
		loop: true,
		placement: 'bottom-start',
	});
	const { 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, ...rest } = props;
	return (
		<>
			<S.Button {...menu} {...rest} ref={ref}>
				{children} <S.ButtonIcon name="caret" />
			</S.Button>
			<S.Menu {...menu} aria-label={ariaLabel} aria-labelledby={ariaLabelledby}>
				{items.map((item, index) => (
					<S.MenuItem {...menu} {...item.props} key={index}>
						{itemProps => React.cloneElement(item, itemProps)}
					</S.MenuItem>
				))}
			</S.Menu>
		</>
	);
});

export default React.memo(Dropdown);
