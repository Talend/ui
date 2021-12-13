import styled from 'styled-components';
import { Button as ReakitButton } from 'reakit';
import tokens from '../../tokens';

export const Button = styled(ReakitButton)`
	position: relative;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-family: ${tokens.fonts.sansSerif};
	background: ${tokens.colors.transparent};
	border: none;
	cursor: pointer;

	// [a11y] increase the clickable area
	&:after {
		content: '';
		position: absolute;
		top: -1 * ${tokens.space.xs};
		right: -1 * ${tokens.space.xs};
		bottom: -1 * ${tokens.space.xs};
		left: -1 * ${tokens.space.xs};
		border-radius: ${tokens.radii.rectRadius};
	}

	.btn__icon {
		flex-grow: 0;
		flex-shrink: 0;
		height: ${tokens.sizes.l};
		max-width: 100%;
	}

	.btn__loading,
	.btn__icon {
		margin: 0;

		+ .btn__text {
			margin-left: ${tokens.space.s};
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
		white-space: nowrap;
		width: 1px;
	}
`;
