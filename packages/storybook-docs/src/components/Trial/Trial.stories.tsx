import { Trial } from './Trial';

import { Meta, StoryFn } from '@storybook/react';

export default {
	component: Trial,
} as Meta<typeof Trial>;

export const Story: StoryFn<typeof Trial> = () => {
	return <Trial>Trial component</Trial>;
};
