import React from 'react';
import { useMenuState, Menu, MenuButton, MenuItem } from 'reakit/Menu';
import styled from 'styled-components';
import Icon from '../Icon';
import tokens from '../../tokens';

const StyledIcon = styled(Icon)`
	height: 0.8rem;
	width: 0.8rem;
`;

const StyledMenu = styled(Menu)`
	display: flex;
	flex-direction: column;
	padding: ${tokens.space.smaller} 0;
	max-width: 25rem;
	background: ${tokens.colors.white};
	border-radius: ${tokens.radii.rectRadius};
	border: ${tokens.borders.normal};
	z-index: ${tokens.zIndices.dropdowns};
`;

const StyledMenuItem = styled(MenuItem)`
	padding: ${tokens.space.small} ${tokens.space.normal};
`;

const Dropdown = React.forwardRef(({ children, items, ...props }, ref) => {
	const menu = useMenuState({
		gutter: 0,
		loop: true,
		placement: 'bottom-start',
	});
	const { 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, ...rest } = props;
	return (
		<>
			<MenuButton {...menu} {...rest} ref={ref}>
				{children} <StyledIcon name="caret" />
			</MenuButton>
			<StyledMenu {...menu} aria-label={ariaLabel} aria-labelledby={ariaLabelledby}>
				{items.map((item, i) => (
					<StyledMenuItem {...menu} {...item.props} key={i}>
						{(itemProps) => React.cloneElement(item, itemProps)}
					</StyledMenuItem>
				))}
			</StyledMenu>
		</>
	);
});

export default React.memo(Dropdown);
