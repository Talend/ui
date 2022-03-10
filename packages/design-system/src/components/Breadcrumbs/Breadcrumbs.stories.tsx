import React from 'react';
import { ComponentStory } from '@storybook/react';
import Breadcrumbs from './Breadcrumbs';

export default {
	component: Breadcrumbs,
};

const BreadcrumbsTemplate: ComponentStory<typeof Breadcrumbs> = args => {
	return <Breadcrumbs {...args} />;
};

export const Basic = BreadcrumbsTemplate.bind({});
