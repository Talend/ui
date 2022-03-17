import React from 'react';
import { ComponentStory } from '@storybook/react';
import EmptyState from '.';

export default {
	component: EmptyState,
};

const Template: ComponentStory<typeof EmptyState> = args => {
	return <EmptyState {...args} />;
};

export const Default = Template.bind({});
Default.args = {
	title: 'No preparations yet',
	description: 'Add a preparation to clean, format, and transform data priori to processing',
};
