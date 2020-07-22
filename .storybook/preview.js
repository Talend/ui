import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { addDecorator, addParameters } from '@storybook/react';
import { withContexts } from '@storybook/addon-contexts/react';
import 'focus-visible';

import { DocsContainer } from './docs/DocsContainer';
import { contexts } from './contexts';

const GlobalStyle = createGlobalStyle(
	({ theme }) => `
  
	html {
		/* 1rem = 10px */
		font-size: 62.5%;
	}

	body {
		margin: 0;
		padding: 0;
        font-size: 14px;
	}
	
	#storybook-preview-iframe {
		${theme.colors.backgroundColor}
	}
	
	.sbdocs.sbdocs-wrapper {
		margin: -1rem;
	}

	.sb-show-main,
	.sbdocs.sbdocs-preview {
		background: ${theme.colors.backgroundColor}
	}
	
	.js-focus-visible :focus:not(.focus-visible) {
  		outline: none;
	}
	
	.focus-visible {
		outline: 0.3rem solid ${theme.colors.focusColor} !important;
	}
`,
);

const RowDiv = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

addDecorator((storyFn, ...rest) => (
	<RowDiv>
		<GlobalStyle />
		{storyFn()}
	</RowDiv>
));

addDecorator(withContexts(contexts));

addParameters({
	docs: {
		container: DocsContainer,
	},
});
