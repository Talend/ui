import React from 'react';
import { Button as ReakitButton } from 'reakit';
import styled from 'styled-components';
import tokens from '../../tokens';

export type ButtonProps = {
	/** If the button is small or not */
	small?: boolean;
};

const BaseButton: React.FC<ButtonProps> = styled(
	React.forwardRef(({ theme, small, ...props }: ButtonProps, ref) => (
		<ReakitButton {...props} ref={ref} />
	)),
)(
	({ theme, small }: ButtonProps) => `
	display: inline-flex;
	align-items: center;
	padding: ${tokens.space.none} ${tokens.space.large};
	min-height: ${tokens.sizes.large};
	font-family: ${tokens.fonts.sansSerif};
	color: ${theme.colors.textColor};
	background: ${tokens.colors.transparent};
	border: ${tokens.borders.normal};
	border-radius: ${tokens.radii.rectRadius};
	cursor: pointer;

	&[aria-disabled='true'] {
		cursor: not-allowed;
	}

	svg {
		margin-left: 1rem;
		fill: currentColor;
		flex-grow: 0;
		flex-shrink: 0;
	}

	${
		small
			? `
			padding: ${tokens.space.none} ${tokens.space.small};
			min-height: ${tokens.sizes.small};
		`
			: ''
	}
`,
);

export default BaseButton;
