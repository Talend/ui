import React from 'react';
import styled from 'styled-components';
import { addDecorator, addParameters } from '@storybook/react';
import { withTableOfContents } from 'storybook-docs-toc';
import { withContexts } from '@storybook/addon-contexts/react';
import 'focus-outline-manager';

import { contexts } from './contexts';
import { GlobalStyle } from '../src/components/ThemeProvider';

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

addParameters(withTableOfContents());
