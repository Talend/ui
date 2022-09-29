import React from 'react';
import { action } from '@storybook/addon-actions';

import Link from '../../Link';

import ErrorState from './ErrorState';

export default { component: ErrorState };

export const DefaultStory = () => (
	<ErrorState
		title="Couldn't load your data"
		description="We couldn't retrieve your data, you should try later"
	/>
);

export const WithLink = () => (
	<ErrorState
		title="Couldn't load your data"
		description="We couldn't retrieve your data, you should try later"
		link={
			<span>
				read more <Link href="https://www.talend.com">here</Link>
			</span>
		}
	/>
);

export const WithLinkProps = () => (
	<ErrorState
		title="Couldn't load your data"
		description="We couldn't retrieve your data, you should try later"
		link={{
			href: 'https://www.talend.com',
			children: 'Link built with props',
		}}
	/>
);

export const WithAction = () => (
	<ErrorState
		title="Couldn't load your data"
		description="We couldn't retrieve your data, you should try later"
		action={{ children: 'Try again', onClick: action('actionClicked') }}
	/>
);

export const WithActionAndLink = () => (
	<ErrorState
		title="Couldn't load your data"
		description="We couldn't retrieve your data, you should try later"
		action={{ children: 'Try again', onClick: action('actionClicked') }}
		link={
			<span>
				read more <Link href="https://www.talend.com">here</Link>
			</span>
		}
	/>
);
