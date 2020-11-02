import styled from 'styled-components';
import { transparentize } from 'polished';

import Button from '../Button';
import Link from '../Link';

import tokens from '../../tokens';

function getLogo(name: string) {
	switch (name) {
		case 'TAPID':
			return 'API-D';
		case 'TAPIT':
			return 'API-T';
		default:
			return name;
	}
}

export const Nav = styled.nav.attrs({
	className: 'c-menu',
})<{ isCollapsed: boolean; variant: string }>(
	({ isCollapsed, theme, variant = '' }) => `
		position: relative;		
		flex: 0 1 ${isCollapsed ? '6rem' : '20rem'};
		max-width: ${isCollapsed ? '6rem' : 'auto'};
		min-height: 100%;
		color: ${tokens.colors.gray0};
		background: ${tokens.colors.twilight.backgroundImage};
		transition: flex-basis .3s;
		overflow: hidden;
		
		${
			!isCollapsed &&
			`
		&:before {
			position: absolute;
			content: '';
			height: 29rem;
			width: 29rem;
			left: 0;
			bottom: -6rem;
			mask-image: ${
				variant !== ''
					? `url('${
							require(`@svgr/webpack!./../../images/logos/negative/${getLogo(variant)}_reg_neg.svg`)
								.default
					  }')`
					: ''
			};
			background-color: ${variant !== '' ? tokens.colors.gray0 : tokens.colors.transparent};
    		opacity: 0.1;
		}`
		}
`,
);

export const NavButton = styled(Button.Icon)`
	flex: 0;
	align-self: start;
	margin: 1.5rem;
	border: none;
	transform: translateZ(0);

	&.nav__button,
	&.nav__button:hover,
	&.nav__button:active {
		color: inherit;
		background: none;
	}

	.btn__icon {
		transition: transform 0.2s;
	}

	&.nav__button--collapsed {
		.btn__icon {
			transform: rotate(-180deg);
		}
	}
`;

export const Menu = styled.div`
	transform: translateZ(0);

	ul {
		display: flex;
		flex-direction: column;
		margin: 0;
		padding: 0;
	}

	li {
		width: 100%;
		padding: 0.5rem 1rem;
		min-width: 0;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
`;

export const MenuItem = styled(Link).attrs(({ active }) => ({
	'aria-current': active ? 'page' : null,
}))(
	({ active, theme }) => `
        display: flex;
        padding: 0.5rem 1rem;
        color: ${active ? tokens.colors.deepBlue500 : 'inherit'};
        background: ${active ? tokens.colors.gray0 : 'none'};
        border-radius: ${tokens.radii.rectRadius};
        min-width: 0;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        cursor: pointer;
		
		.link__icon {
			height: 2rem;
			width: 2rem; 
			margin-right: 1rem;
			overflow: visible;
		}

		.link__text {
			font-weight: ${tokens.fontWeights.semiBold};
			min-width: 0;
			white-space: nowrap;
			text-overflow: ellipsis;
			text-decoration: none !important;
			overflow: hidden;
		}

        &:hover {
            color: ${active ? theme.colors.primary : 'inherit'};
            background: ${transparentize(active ? 0.12 : 0.88, tokens.colors.gray0)};
        }
    `,
);
