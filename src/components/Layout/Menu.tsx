import React from 'react';
import styled from 'styled-components';
import { transparentize } from 'polished';

import Link from '../Link';
import tokens from '../../tokens';

const SMenu = styled.div(
	({ theme }) => `
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
    `,
);
const SMenuItem = styled(Link).attrs(({ active }) => ({
	'aria-current': active ? 'page' : null,
}))(
	({ active, theme }) => `
        display: flex;
        padding: 0.5rem 1rem;
        color: ${active ? theme.colors.primary : tokens.colors.gray0};
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
            font-weight: ${tokens.fontWeights.extraBold};
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

const MenuItem = props => {
	return <SMenuItem {...props} />;
};

const Menu = ({ children }) => {
	return (
		<SMenu>
			<ul>
				{children.map((child, index) => (
					<li key={index}>{child}</li>
				))}
			</ul>
		</SMenu>
	);
};

Menu.Item = MenuItem;

export default Menu;
