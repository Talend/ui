import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { addParameters, addDecorator } from '@storybook/react';
import { withContexts } from '@storybook/addon-contexts/react';
import { normalize } from 'polished';

import { contexts } from './contexts';

addParameters({
	backgrounds: [
		{ name: 'Default background', value: '#ffffff', default: true },
		{ name: 'Dark background', value: '#222222' },
	],
});

addDecorator(withContexts(contexts));

const GlobalStyle = createGlobalStyle`
  	${normalize()}
  
	html {
		/* 1rem = 10px */
		font-size: 62.5%;
	}

	body {
		font-size: 1.4rem;
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
