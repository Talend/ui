import styled from 'styled-components';

import tokens from '../../tokens';

export const Link = styled.a`
	font-family: ${tokens.fonts.sansSerif};
	color: var(--t-link-color, ${({ theme }) => theme.colors?.linkColor});
	border-bottom-color: currentColor;

	&,
	&:hover,
	&:active,
	&:focus,
	&:visited {
		text-decoration: none;
	}

	.link__text {
		border-bottom: 0.1rem solid transparent;
		transition: ${tokens.transitions.fast};
	}

	.link__icon {
		margin-bottom: -0.2rem;
		height: ${tokens.sizes.m};
		width: ${tokens.sizes.m};

		&--external {
			margin-bottom: -0.1rem;
			height: ${tokens.sizes.s};
			width: ${tokens.sizes.s};
		}

		&--before {
			margin-right: ${tokens.space.xs};
		}

		&--external,
		&--after {
			margin-left: ${tokens.space.xs};
		}
	}

	&:hover {
		color: var(--t-link-color--hover, ${({ theme }) => theme.colors?.linkHoverColor});

		.link__text {
			border-bottom-color: var(
				--t-link-color--hover,
				${({ theme }) => theme.colors?.linkHoverColor}
			);
		}
	}

	&:active {
		color: var(--t-link-color--active, ${({ theme }) => theme.colors?.linkActiveColor});

		.link__text {
			border-bottom-color: var(
				--t-link-color--active,
				${({ theme }) => theme.colors?.linkActiveColor}
			);
		}
	}

	&.link--disabled {
		cursor: not-allowed;
		opacity: ${tokens.opacity.disabled};

		.link__text {
			border-bottom-color: transparent;
		}
	}
`;
