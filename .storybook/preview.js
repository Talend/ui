import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { addDecorator, addParameters } from '@storybook/react';
import { withContexts } from '@storybook/addon-contexts/react';
import { normalize } from 'polished';
import { contexts } from './contexts';

const GlobalStyle = createGlobalStyle(
	({ theme }) => `
	${normalize()}
  
	html {
		/* 1rem = 10px */
		font-size: 62.5%;
	}

	body {
		font-size: 1.6rem;
		background: ${theme.colors.backgroundColor};
	}
`,
);

const RowDiv = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

addDecorator((storyFn) => (
	<RowDiv>
		<GlobalStyle />
		{storyFn()}
	</RowDiv>
));

addDecorator(withContexts(contexts));
