import React from 'react';
import styled from 'styled-components';

import Link from '../Link';
import tokens from '../../tokens';

const SSkipLinks = styled.div(
	({ theme }) => `
	.skip-links__link {
		position: absolute;
		top: 0;
		left: 0;
		width: 1px;
		height: 1px;
		padding: ${tokens.space.m};
		color: ${theme.colors.backgroundColor};
		background: ${theme.colors.textColor};
		white-space: nowrap;
		clip: rect(1px, 1px, 1px, 1px);
		overflow: hidden;

		&:focus {
			width: auto;
			height: auto;
			clip: auto;
			overflow: auto;	
			z-index: ${tokens.zIndices.skipLinks};		
		}
	}
`,
);

const SkipLinks = ({ nav, main }) => {
	return (
		<SSkipLinks className="skip-links">
			<ul>
				{nav && (
					<li key="nav">
						<Link className="skip-links__link" href="#nav">
							Go to navigation
						</Link>
					</li>
				)}
				{main && (
					<li key="main">
						<Link className="skip-links__link" href="#main">
							Go to main content
						</Link>
					</li>
				)}
			</ul>
		</SSkipLinks>
	);
};

export default SkipLinks;
