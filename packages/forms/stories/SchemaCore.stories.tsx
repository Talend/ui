import type { Meta } from '@storybook/react';
import { UIForm } from '../src';
import { concepts } from './json';
import { argTypes } from './argTypes';

export default {
	title: 'Forms/Schema/Core',
	component: UIForm,
	argTypes,
	parameters: {
		formStoryDisplayMode: {
			category: 'concepts',
		},
	},
} as Meta<typeof UIForm>;

export const ConditionalRender = {
	args: {
		data: concepts.conditionalRender,
	},
};

export const CustomValidation = {
	args: {
		data: concepts.customValidation,
	},
};
export const FormatValidation = {
	args: {
		data: concepts.formatValidation,
	},
};
export const Hint = {
	args: {
		data: concepts.hint,
	},
};
export const Simple = {
	args: {
		data: concepts.simple,
	},
};
export const StructuredModel = {
	args: {
		data: concepts.structuredModel,
	},
};
export const TriggerAfter = {
	args: {
		data: concepts.triggerAfter,
	},
};
