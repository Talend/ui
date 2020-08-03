import styled from 'styled-components';
import { Button as ReakitButton } from 'reakit';
import tokens from '../../tokens';

export const Button = styled(ReakitButton)(
	({ theme }) => `
	display: inline-flex;
	align-items: center;
	padding: ${tokens.space.none} ${tokens.space.large};
	min-height: ${tokens.sizes.large};
	font-family: ${tokens.fonts.sansSerif};
	color: ${theme.colors.textColor};
	background: ${tokens.colors.transparent};
	border: ${tokens.borders.normal};
	border-radius: ${tokens.radii.rectRadius};
	transition: all 0.2s;
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

	&.btn {
		.btn__icon {
			margin: 0 1rem 0 0;
			height: 1.2rem;
			
			path {
				fill: currentColor;
			}
		}

		&--small {
			padding: ${tokens.space.none} ${tokens.space.small};
			min-height: ${tokens.sizes.small};
		}
		
		&--icon {
			.btn__icon {
				margin: 0;
			}
		}
	}
`,
);
