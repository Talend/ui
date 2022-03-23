import React from 'react';
import { ComponentStory } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import EmptyState from '.';

export default {
	component: EmptyState,
};

const Template: ComponentStory<typeof EmptyState> = args => {
	return <EmptyState {...args} />;
};

export const Icon = Template.bind({});
Icon.args = {
	title: 'No preparations yet.',
	description: 'Add a preparation to clean, format, and transform data prior to processing.',
	variant: 'icon',
	docLinkURL: 'https://talend.com',
};

export const Spot = Template.bind({});
Spot.args = {
	title: 'No preparations yet.',
	description: 'Add a preparation to clean, format, and transform data prior to processing.',
	variant: 'spot',
	docLinkURL: 'https://talend.com',
	callback: { label: 'Create a dataset', action: () => action('clicked'), icon: 'talend-plus' },
};
