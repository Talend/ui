import { Trial } from './Trial';

import { Meta, StoryFn } from '@storybook/react';

const meta: Meta<typeof Trial> = {
  component: Trial,
};

export default meta;

export const Story: StoryFn<typeof Trial> = () => {
	return <Trial>Trial component</Trial>;
};
