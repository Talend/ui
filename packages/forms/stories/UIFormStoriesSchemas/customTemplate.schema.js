export const customTemplateSchema = {
	jsonSchema: {
		title: 'Custom array',
		type: 'object',
		properties: {
			list: {
				type: 'array',
				items: {
					type: 'string',
				},
			},
		},
	},
	properties: {
		list: ['one', 'two'],
	},
	uiSchema: ['list'],
};
