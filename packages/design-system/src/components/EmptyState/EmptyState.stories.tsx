import React from 'react';
import { action } from '@storybook/addon-actions';
import { EmptyStateLarge, EmptyStateMedium, EmptyStateSmall } from '.';

export default {
	component: EmptyStateLarge,
};

export const Large = () => (
	<EmptyStateLarge
		title="No preparations yet."
		docLinkURL="https://talend.com"
		description="Add a preparation to clean, format, and transform data prior to processing."
		callback={{ label: 'Create a dataset', action: () => action('clicked'), icon: 'talend-plus' }}
	/>
);

export const Medium = () => (
	<EmptyStateMedium
		title="No preparations yet."
		docLinkURL="https://talend.com"
		description="Add a preparation to clean, format, and transform data prior to processing."
	/>
);

export const Small = () => <EmptyStateSmall title="Create a preparation first" />;
