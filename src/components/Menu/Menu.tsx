import React from 'react';
import styled from 'styled-components';
import useMedia from 'react-use/lib/useMedia';
import { transparentize } from 'polished';

import Link from '../Link';
import tokens from '../../tokens';
import Button from '../Button';

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

const SNav = styled.nav<{ isCollapsed: boolean; variant: string }>(
	({ isCollapsed, theme, variant = '' }) => `
		position: relative;		
		flex: 0 1 ${isCollapsed ? '6rem' : '20rem'};
		max-width: ${isCollapsed ? '6rem' : 'auto'};
		min-height: 100%;
		color: ${tokens.colors.gray0};
		background: ${tokens.colors.twilight.backgroundImage};
		transition: flex-basis .3s;
		overflow: hidden;
		
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
		}
		
		.nav__button {
			flex: 0;
			align-self: start;
			margin: 1.5rem;
			color: ${tokens.colors.gray0};
			border: none;
			transform: translateZ(0px);

			.btn__icon {
				transition: transform 0.2s;
			}

			&--collapsed {
				.btn__icon {
					transform: rotate(-180deg);
				}
			}
		}
`,
);

const SMenu = styled.div`
	transform: translateZ(0px);

	ul {
		display: flex;
		flex-direction: column;
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

const SMenuItem = styled(Link).attrs(({ active }) => ({
	'aria-current': active ? 'page' : null,
}))(
	({ active, theme }) => `
        display: flex;
        padding: 0.5rem 1rem;
        color: ${active ? tokens.colors.deepBlue500 : tokens.colors.gray0};
        background-color: ${active ? tokens.colors.gray0 : tokens.colors.transparent};
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
            fill: currentColor;  
            overflow: visible;
        }

        .link__text {
            font-weight: ${tokens.fontWeights.semiBold};
            min-width: 0;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }

        &:hover {
            color: ${active ? theme.colors.primary : tokens.colors.gray0};
            background: ${transparentize(active ? 0.12 : 0.88, tokens.colors.gray0)};
        
            .link__text {
                text-decoration: none;
            }
        }


    `,
);

const MenuItem = React.forwardRef((props, ref) => <SMenuItem ref={ref} {...props} />);

const Menu = React.forwardRef(({ children, ...rest }, ref) => {
	const [isCollapsed, collapse] = React.useState(false);
	const isWide = useMedia(`(min-width: ${tokens.breakpoints.l})`);

	React.useEffect(() => {
		collapse(!isWide);
	}, [isWide]);

	return (
		<SNav
			isCollapsed={isCollapsed}
			role="navigation"
			aria-label="main navigation"
			ref={ref}
			{...rest}
		>
			<Button.Icon
				icon="opener"
				className={`nav__button ${isCollapsed ? 'nav__button--collapsed' : ''}`}
				onClick={() => collapse(!isCollapsed)}
			>
				{isCollapsed ? 'Uncollapse menu' : 'Collapse menu'}
			</Button.Icon>
			<SMenu>
				{Array.isArray(children) ? (
					<ul>
						{children.map((child, index) => (
							<li key={index}>{child}</li>
						))}
					</ul>
				) : (
					children
				)}
			</SMenu>
		</SNav>
	);
});

Menu.Item = MenuItem;

export default Menu;
