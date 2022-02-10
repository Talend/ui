import React from 'react';
import { ComponentStory } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { LinkAsButton } from '.';

export default {
	component: LinkAsButton,
};

const LinkAsButtonTemplate: ComponentStory<typeof LinkAsButton> = args => {
	return <LinkAsButton {...args} />;
};

export const LinkAsButtonStory = LinkAsButtonTemplate.bind({});
LinkAsButtonStory.argTypes = {
	children: {
		control: { type: 'text' },
		defaultValue: 'Link label',
	},
	onClick: {
		disabled: true,
		description: 'A callback function',
		defaultValue: action('Button clicked'),
	},
	icon: {
		control: { type: 'text' },
		defaultValue: 'talend-info-circle',
		description: 'optional',
	},
	disabled: {
		control: { type: 'boolean' },
		defaultValue: false,
		description: 'optional',
	},
	focusable: {
		control: { type: 'boolean' },
		defaultValue: false,
		description: 'optional',
	},
};
