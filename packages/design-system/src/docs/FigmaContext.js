import React from 'react';
import * as Figma from 'figma-js';

const token = process.env.STORYBOOK_FIGMA_ACCESS_TOKEN;

export default React.createContext({
	...Figma.Client({
		personalAccessToken: token,
	}),
	isConfigured: !!token,
});
