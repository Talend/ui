import { createContext } from 'react';
import * as Figma from 'figma-js';

const token = process.env.STORYBOOK_FIGMA_ACCESS_TOKEN;

export default createContext({
	// eslint-disable-next-line new-cap
	...Figma.Client({
		personalAccessToken: token,
	}),
	isConfigured: !!token,
});
