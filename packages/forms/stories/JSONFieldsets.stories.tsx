import type { Meta } from '@storybook/react';
import { UIForm } from '../src';
import { fieldsets } from './json';

export default {
	title: 'Forms/Fieldsets',
	component: UIForm,
	parameters: {
		formStoryDisplayMode: {
			category: 'fieldsets',
		},
	},
} as Meta<typeof UIForm>;

export const CoreArraysComplex = {
	parameters: {
		formStoryDisplayMode: {
			doc: 'Array/README.md',
		},
	},
	args: {
		data: fieldsets.coreArraysComplex,
	},
};
export const CoreArraysWithCustomOptions = {
	parameters: {
		formStoryDisplayMode: {
			doc: 'Array/README.md',
		},
	},
	args: {
		data: fieldsets.coreArraysWithCustomOptions,
	},
};
export const CoreArrays = {
	parameters: {
		formStoryDisplayMode: {
			doc: 'Array/README.md',
		},
	},
	args: {
		data: fieldsets.coreArrays,
	},
};
export const CoreCollapsibleFieldset = {
	parameters: {
		formStoryDisplayMode: {
			doc: 'CollapsibleFieldset/README.md',
		},
	},
	args: {
		data: fieldsets.coreCollapsibleFieldset,
	},
};
export const CoreColumns = {
	parameters: {
		formStoryDisplayMode: {
			doc: 'Columns/README.md',
		},
	},
	args: {
		data: fieldsets.coreColumns,
	},
};
export const CoreFieldset = {
	parameters: {
		formStoryDisplayMode: {
			doc: 'Fieldset/README.md',
		},
	},
	args: {
		data: fieldsets.coreFieldset,
	},
};
export const CoreTabs = {
	parameters: {
		formStoryDisplayMode: {
			doc: 'Tabs/README.md',
		},
	},
	args: {
		data: fieldsets.coreTabs,
	},
};
