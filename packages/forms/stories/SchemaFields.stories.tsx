import type { Meta } from '@storybook/react';
import { UIForm } from '../src';
import { fields } from './json';
import { argTypes } from './argTypes';

export default {
	title: 'Forms/Schema/Fields',
	component: UIForm,
	argTypes,
	parameters: {
		formStoryDisplayMode: {
			category: 'fields',
		},
	},
} as Meta<typeof UIForm>;

export const CoreButtons = {
	parameters: {
		formStoryDisplayMode: {
			doc: 'Button/README.md',
		},
	},
	args: {
		data: fields.coreButtons,
	},
};
export const CoreCheckbox = {
	parameters: {
		formStoryDisplayMode: {
			doc: 'CheckBox/README.md',
		},
	},
	args: {
		data: fields.coreCheckbox,
	},
};
export const CoreCode = {
	parameters: {
		formStoryDisplayMode: {
			doc: 'Code/README.md',
		},
	},
	args: {
		data: fields.coreCode,
	},
};
export const CoreComparatorInput = {
	parameters: {
		formStoryDisplayMode: {
			doc: 'ComparatorInput/README.md',
		},
	},
	args: {
		data: fields.coreComparatorInput,
	},
};
export const CoreDatalist = {
	parameters: {
		formStoryDisplayMode: {
			doc: 'Datalist/README.md',
		},
	},
	args: {
		data: fields.coreDatalist,
	},
};
export const CoreDate = {
	parameters: {
		formStoryDisplayMode: {
			doc: 'Date/README.md',
		},
	},
	args: {
		data: fields.coreDate,
	},
};
export const CoreEnumeration = {
	parameters: {
		formStoryDisplayMode: {
			doc: 'Enumeration/README.md',
		},
	},
	args: {
		data: fields.coreEnumeration,
	},
};
export const CoreFile = {
	parameters: {
		formStoryDisplayMode: {
			doc: 'File/README.md',
		},
	},
	args: {
		data: fields.coreFile,
	},
};
export const CoreKeyValue = {
	parameters: {
		formStoryDisplayMode: {
			doc: 'KeyValue/README.md',
		},
	},
	args: {
		data: fields.coreKeyValue,
	},
};
export const CoreListView = {
	parameters: {
		formStoryDisplayMode: {
			doc: 'ListView/README.md',
		},
	},
	args: {
		data: fields.coreListView,
	},
};
export const CoreMultiSelectTag = {
	parameters: {
		formStoryDisplayMode: {
			doc: 'MultiSelectTag/README.md',
		},
	},
	args: {
		data: fields.coreMultiSelectTag,
	},
};
export const CoreNestedListView = {
	parameters: {
		formStoryDisplayMode: {
			doc: 'NestedListView/README.md',
		},
	},
	args: {
		data: fields.coreNestedListView,
	},
};
export const CoreRadioOrSelect = {
	parameters: {
		formStoryDisplayMode: {
			doc: 'RadioOrSelect/README.md',
		},
	},
	args: {
		data: fields.coreRadiosOrSelect,
	},
};
export const CoreRadios = {
	parameters: {
		formStoryDisplayMode: {
			doc: 'Radios/README.md',
		},
	},
	args: {
		data: fields.coreRadios,
	},
};

export const CoreResourcePicker = {
	parameters: {
		formStoryDisplayMode: {
			doc: 'ResourcePicker/README.md',
		},
	},
	args: {
		data: fields.coreResourcePicker,
		onTrigger: () =>
			new Promise(resolve => {
				setTimeout(
					() =>
						resolve({
							collection: [
								{
									id: '0',
									name: 'Title with few actions',
									modified: 1442880000000,
									icon: 'talend-file-xls-o',
									author: 'First Author',
									flags: ['CERTIFIED', 'FAVORITE'],
								},
								{
									id: '1',
									name: 'Title with lot of actions',
									modified: 1537574400000,
									icon: 'talend-file-xls-o',
									author: 'Second Author',
								},
								{
									id: '2',
									name: 'Title with persistant actions',
									modified: 1474502400000,
									author: 'Jean-Pierre DUPONT',
									icon: 'talend-file-xls-o',
									flags: ['FAVORITE'],
								},
								{
									id: '3',
									name: 'Title with icon',
									modified: 1506038400000,
									author: 'Third Author',
									icon: 'talend-file-xls-o',
									flags: ['CERTIFIED'],
								},
								{
									id: '4',
									name: 'Title in input mode',
									modified: 1506038400000,
									author: 'Jean-Pierre DUPONT',
									icon: 'talend-file-xls-o',
								},
								{
									id: '5',
									name: 'Title with long long long long long long long long long long long text',
									modified: 1547478328552,
									author: 'Jean-Pierre DUPONT with super super super long text',
									icon: 'talend-file-xls-o',
									flags: ['CERTIFIED', 'FAVORITE'],
								},
							],
						}),
					3000,
				);
			}),
	},
};
export const CoreSelect = {
	parameters: {
		formStoryDisplayMode: {
			doc: 'Select/README.md',
		},
	},
	args: {
		data: fields.coreSelect,
	},
};
export const CoreText = {
	parameters: {
		formStoryDisplayMode: {
			doc: 'Text/README.md',
		},
	},
	args: {
		data: fields.coreText,
	},
};
export const CoreTimezoneList = {
	parameters: {
		formStoryDisplayMode: {
			doc: 'TimezoneList/README.md',
		},
	},
	args: {
		data: fields.coreTimezoneList,
	},
};
export const CoreToggle = {
	parameters: {
		formStoryDisplayMode: {
			doc: 'Toggle/README.md',
		},
	},
	args: {
		data: fields.coreToggle,
	},
};
