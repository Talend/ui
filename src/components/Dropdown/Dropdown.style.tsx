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
	display: inline-block;
	height: ${tokens.sizes.xs};
	width: ${tokens.sizes.xs};
	fill: currentColor;
`;

export const Menu = styled(ReakitMenu)`
	display: flex;
	flex-direction: column;
	padding: 0;
	min-width: 15rem;
	max-width: 25rem;
	color: ${tokens.colors.gray900};
	background: none;
	border-radius: ${tokens.radii.rectRadius};
	border: 0;
	z-index: ${tokens.zIndices.dropdowns};
`;

export const AnimatedMenu = styled.div`
	display: flex;
	flex-direction: column;
	background: ${tokens.colors.gray0};
	padding: ${tokens.space.xs} ${tokens.space.none};
	border: ${tokens.borders.normal};
	transition: opacity 250ms ease-in-out;
	opacity: 0;

	[data-enter] & {
		opacity: 1;
	}
`;

export const MenuItem = styled(ReakitMenuItem)`
	padding: ${tokens.space.s} ${tokens.space.m};
	color: ${tokens.colors.gray900};
	cursor: pointer;
`;
