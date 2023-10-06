import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
<<<<<<<< HEAD:packages/design-system/src/stories/LinkAsButton.stories.tsx
import { LinkAsButton } from '../';

export default {
	component: LinkAsButton,
	title: 'Click/LinkAsButton',
========
import { LinkAsButton } from '../../';

export default {
	component: LinkAsButton,
	title: 'Clickable/LinkAsButton',
>>>>>>>> master:packages/design-system/src/stories/clickable/LinkAsButton.stories.tsx
};

const LinkAsButtonTemplate: StoryFn<typeof LinkAsButton> = args => {
	return <LinkAsButton {...args} />;
};

export const LinkAsButtonStory = LinkAsButtonTemplate.bind({});
LinkAsButtonStory.args = {
	children: 'Link label',
	onClick: action('Button clicked'),
	icon: 'talend-info-circle',
	disabled: false,
	focusable: false,
};
LinkAsButtonStory.argTypes = {
	children: {
		control: { type: 'text' },
	},
	onClick: {
		disabled: true,
		description: 'A callback function',
	},
	icon: {
		control: { type: 'text' },
		description: 'optional',
	},
	disabled: {
		control: { type: 'boolean' },
		description: 'optional',
	},
	focusable: {
		control: { type: 'boolean' },
		description: 'optional',
	},
};
