import React from 'react';
import {
	Menu as ReakitMenu,
	MenuButton as ReakitMenuButton,
	MenuItem as ReakitMenuItem,
} from 'reakit/Menu';
import styled from 'styled-components';
import Icon from '../Icon';
import tokens from '../../tokens';

export const Button = ReakitMenuButton;

export const ButtonIcon = styled(Icon)`
	height: ${tokens.sizes.smallerrr};
	width: ${tokens.sizes.smallerrr};
`;

export const Menu = styled(ReakitMenu)`
	display: flex;
	flex-direction: column;
	padding: ${tokens.space.smaller} ${tokens.space.none};
	max-width: 25rem;
	background: ${tokens.colors.white};
	border-radius: ${tokens.radii.rectRadius};
	border: ${tokens.borders.normal};
	z-index: ${tokens.zIndices.dropdowns};
`;

export const MenuItem = styled(ReakitMenuItem)`
	padding: ${tokens.space.small} ${tokens.space.normal};
`;
