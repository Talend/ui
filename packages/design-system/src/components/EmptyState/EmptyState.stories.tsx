import React from 'react';
import { action } from '@storybook/addon-actions';
import { BrowserRouter, Link } from 'react-router-dom';
import { EmptyStateLarge, EmptyStateMedium, EmptyStateSmall } from '.';
import { StackHorizontal } from '../Stack';

export default {
	component: EmptyStateLarge,
};

export const Large = () => (
	<EmptyStateLarge
		title="No preparations yet"
		description="Add a preparation to clean, format, and transform data prior to processing."
		callback={{
			children: 'Create a dataset',
			onClick: () => action('clicked'),
			icon: 'talend-plus',
			callbackType: 'button',
		}}
		docLinkURL="https://talend.com"
	/>
);

export const LargeWithLinkButton = () => (
	<BrowserRouter>
		<EmptyStateLarge
			title="No preparations yet"
			description="Add a preparation to clean, format, and transform data prior to processing."
			callback={{
				children: 'Create a preparation',
				icon: 'talend-plus',
				callbackType: 'link',
				as: <Link to="/preparation/new" />,
			}}
			docLinkURL="https://talend.com"
		/>
	</BrowserRouter>
);

export const Medium = () => (
	<EmptyStateMedium
		title="No preparations yet"
		description="Add a preparation to clean, format, and transform data prior to processing."
		docLinkURL="https://talend.com"
	/>
);

export const Small = () => <EmptyStateSmall title="Create a preparation first" />;

export const Demo = () => (
	<StackHorizontal gap="XS" align="center" justify="spaceBetween">
		<EmptyStateLarge
			title="This space is empty"
			description="Any additional data here"
			callback={{
				children: 'Action',
				onClick: () => action('clicked'),
				callbackType: 'button',
			}}
			docLinkURL="https://talend.com"
		/>
		<EmptyStateMedium
			title="This space is empty"
			description="Any additional data here"
			docLinkURL="https://talend.com"
		/>
		<EmptyStateSmall title="This space is empty" />
	</StackHorizontal>
);
