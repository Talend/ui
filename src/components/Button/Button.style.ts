import styled from 'styled-components';
import { Button as ReakitButton } from 'reakit';
import tokens from '../../tokens';

export const Button = styled(ReakitButton)(
	({ theme }) => `
	display: inline-flex;
	align-items: center;
	padding: ${tokens.space.none} ${tokens.space.l};
	min-height: ${tokens.sizes.xxl};
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
		flex-grow: 0;
		flex-shrink: 0;
	}

	&.btn--small {
		min-height: ${tokens.sizes.xl};
	
		&.btn--has-text {
			padding: ${tokens.space.none} ${tokens.space.s};
		}
	}
	
	.btn__icon {
		margin: 0;
		
		path {
			fill: currentColor;
		}

		+ .btn__text {
			margin-left: 1rem; 
		}
	}
	
	.btn__text {
		flex: 1;
		display: inline-flex;
		align-items: center;
	}

	.btn__text--hidden {
		border: 0;
		clip: rect(0 0 0 0);
		height: 1px;
		margin: -1px;
		overflow: hidden;
		padding: 0;
		position: absolute;
		whiteSpace: nowrap;
		width: 1px;
	}
`,
);
