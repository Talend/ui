import React from 'react';
import { action } from '@storybook/addon-actions';

import Link from '../../Link';

import ErrorState from './ErrorState';

// Default props
const title = "Couldn't load your data";
const description = "We couldn't retrieve your data, you should try later";
const link = (
	<span>
		read more <Link href="https://www.talend.com">here</Link>
	</span>
);
const actionProp = { children: 'Try again', onClick: action('actionClicked') };

// Stories
export default { component: ErrorState };

export const DefaultStory = () => <ErrorState {...{ title, description }} />;
export const WithLink = () => <ErrorState {...{ title, description, link }} />;
export const WithAction = () => <ErrorState {...{ title, description, action: actionProp }} />;
export const WithActionAndLink = () => (
	<ErrorState {...{ title, description, link, action: actionProp }} />
);
