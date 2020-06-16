import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { addDecorator } from '@storybook/react';
import { withContexts } from '@storybook/addon-contexts/react';
import { normalize } from 'polished';
import { contexts } from './contexts';

const GlobalStyle = createGlobalStyle(
	({ theme }) =>
		console.log('GlobalStyle', theme.id) ||
		`
	${normalize()}
  
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
