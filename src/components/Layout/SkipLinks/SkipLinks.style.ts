import styled from 'styled-components';

import tokens from '../../../tokens';

export const SkipLinks = styled.div(
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
