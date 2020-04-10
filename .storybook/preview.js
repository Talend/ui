import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { addParameters, addDecorator } from '@storybook/react';
import { withContexts } from '@storybook/addon-contexts/react';
import { normalize } from 'polished';
import { DocsPage } from 'storybook-addon-deps/blocks';
import { contexts } from './contexts';

addParameters({
	backgrounds: [
		{ name: 'Default background', value: '#ffffff', default: true },
		{ name: 'Dark background', value: '#222222' },
	],
});

addParameters({
	docs: { page: DocsPage },
	dependencies: { withStoriesOnly: true, hideEmpty: false },
});

addDecorator(withContexts(contexts));

const GlobalStyle = createGlobalStyle`
  	${normalize()}
  
	html {
		/* 1rem = 10px */
		font-size: 62.5%;
	}

	body {
		font-size: 1.6rem;
	}
`;

const RowDiv = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

addDecorator(storyFn => (
	<RowDiv>
		<GlobalStyle />
		{storyFn()}
	</RowDiv>
));
