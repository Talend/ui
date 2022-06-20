import React from 'react';
import Trial from './Trial';

import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
	component: Trial,
} as ComponentMeta<typeof Trial>;

export const Story: ComponentStory<typeof Trial> = () => {
	return <Trial>Trial component</Trial>;
};
