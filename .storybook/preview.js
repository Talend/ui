import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { addDecorator, addParameters } from '@storybook/react';
import { withContexts } from '@storybook/addon-contexts/react';
import 'focus-outline-manager';

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

	.sb-show-main,
	.sbdocs.sbdocs-preview {
		background: ${theme.colors.backgroundColor};
	}

	:focus, 
	button:focus {
		outline: 0.3rem solid ${theme.colors.focusColor};
	}
	
	.focus-outline-hidden *:focus {
		outline: none;
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
