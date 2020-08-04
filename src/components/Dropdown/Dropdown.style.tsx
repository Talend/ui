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
	height: ${tokens.sizes.xs};
	width: ${tokens.sizes.xs};
	fill: currentColor;
`;

export const Menu = styled(ReakitMenu)`
	display: flex;
	flex-direction: column;
	padding: ${tokens.space.xs} ${tokens.space.none};
	max-width: 25rem;
	background: ${tokens.colors.gray0};
	border-radius: ${tokens.radii.rectRadius};
	border: ${tokens.borders.normal};
	z-index: ${tokens.zIndices.dropdowns};
`;

export const MenuItem = styled(ReakitMenuItem)`
	padding: ${tokens.space.s} ${tokens.space.m};
`;
