import React from 'react';
import styled from 'styled-components';

import tokens from '../tokens';

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
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		padding: 0.8rem;
		color: ${tokens.colors.lochmara[500]};
		border: 1px solid ${tokens.colors.lochmara[500]};
		border-radius: ${tokens.radii.rectRadius} 0 0 ${tokens.radii.rectRadius};

		&:hover,
		&:focus,
		&:active {
			background: ${tokens.colors.paleCyan[100]};
		}

		&:active {
			color: ${tokens.colors.lochmara[600]};
			cursor: grabbing;
		}

		+ a {
			border-left: 0;
			border-radius: 0 ${tokens.radii.rectRadius} ${tokens.radii.rectRadius} 0;
		}

		svg {
			margin-right: 0.5rem;
			height: 1.6rem;
			width: 1.6rem;
		}
	}
`;

const Links = ({ children }) => {
	return (
		<LinkBlock>
			See in <LinkGroup>{children}</LinkGroup>
		</LinkBlock>
	);
};

export default Links;
