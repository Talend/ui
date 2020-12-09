import styled from 'styled-components';
import { Button as ReakitButton } from 'reakit';
import tokens from '../../tokens';

export const Button = styled(ReakitButton)(
	({ theme }) => `
	display: inline-flex;
	align-items: center;
	font-family: ${tokens.fonts.sansSerif};
	background: ${tokens.colors.transparent};
	border: none;
	cursor: pointer;

	&[aria-disabled='true'] {
		cursor: not-allowed;
	}
	
	svg {
		flex-grow: 0;
		flex-shrink: 0;
	}
	
	.btn__loading {
		width: ${tokens.sizes.l};
		height: ${tokens.sizes.l};
	}
	
 	.btn__loading,
 	.btn__icon {
		margin: 0;

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

	&.btn--small {
		min-height: ${tokens.sizes.xl};
	
		&.btn--has-text {
			padding: ${tokens.space.none} ${tokens.space.s};
		}
	}
	
	&.btn--loading {
		cursor: progress;
	}
`,
);
