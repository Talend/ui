import type { Meta } from '@storybook/react';
import { fn as action } from 'storybook/test';
import { UIForm } from '../src';
import { concepts } from './json';
import { argTypes } from './argTypes';

export default {
	title: 'Forms/Schema/Core',
	component: UIForm,
	argTypes,
} as Meta<typeof UIForm>;

export const ConditionalRender = {
	args: {
		data: concepts.conditionalRender,
	},
};

export const CustomValidation = {
	args: {
		data: concepts.customValidation,
		CustomValidation: (schema: any, value: any, properties: any) => {
			action('customValidation')(schema, value, properties);
			return value.length >= 5 && 'Custom validation : The value should be less than 5 chars';
		},
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
