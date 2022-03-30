import React from 'react';
import { action } from '@storybook/addon-actions';
import { BrowserRouter, Link } from 'react-router-dom';
import { EmptyStateLarge, EmptyStateMedium, EmptyStateSmall } from '.';

export default {
	component: EmptyStateLarge,
};

export const Large = () => (
	<EmptyStateLarge
		title="No preparations yet."
		docLinkURL="https://talend.com"
		description="Add a preparation to clean, format, and transform data prior to processing."
		callback={{
			children: 'Create a dataset',
			onClick: () => action('clicked'),
			icon: 'talend-plus',
			callbackType: 'button',
		}}
	/>
);

export const LargeWithLinkButton = () => (
	<BrowserRouter>
		<EmptyStateLarge
			title="No preparations yet."
			docLinkURL="https://talend.com"
			description="Add a preparation to clean, format, and transform data prior to processing."
			callback={{
				children: 'Create a preparation',
				icon: 'talend-plus',
				callbackType: 'link',
				as: <Link to="/preparation/new" />,
			}}
		/>
	</BrowserRouter>
);

export const Medium = () => (
	<EmptyStateMedium
		title="No preparations yet."
		docLinkURL="https://talend.com"
		description="Add a preparation to clean, format, and transform data prior to processing."
	/>
);

export const Small = () => <EmptyStateSmall title="Create a preparation first" />;
