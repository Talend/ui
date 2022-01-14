import React from 'react';
import styled from 'styled-components';

import tokens from '@talend/design-tokens';

const LinkBlock = styled.div.attrs({})`
	position: relative;
	float: right;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 1rem 0;
	font-weight: 600;
`;

const LinkGroup = styled.div`
	display: flex;
	margin-left: 1rem;
	height: 3.4rem;

	a {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		padding: 0.8rem;
		color: ${tokens.coralColorAccentText};
		border: 1px solid ${tokens.coralColorAccentBorder};
		border-radius: ${tokens.coralRadiusS} 0 0 ${tokens.coralRadiusS};

		&:hover,
		&:focus {
			background: ${tokens.coralColorAccentTextHover};
			background: ${tokens.coralColorAccentBackgroundHover};
		}

		&:active {
			color: ${tokens.coralColorAccentTextActive};
			background: ${tokens.coralColorAccentBackgroundActive};
		}

		+ a {
			border-left: 0;
			border-radius: 0 ${tokens.coralRadiusS} ${tokens.coralRadiusS} 0;
		}

		svg {
			margin-right: 0.5rem;
			height: 1.6rem;
			width: 1.6rem;
		}
	}
`;

const Links = ({ children }: React.PropsWithChildren<any>) => {
	return (
		<LinkBlock>
			See in <LinkGroup>{children}</LinkGroup>
		</LinkBlock>
	);
};

export default Links;
