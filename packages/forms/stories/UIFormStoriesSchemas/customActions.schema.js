export const customActionsSchema = {
	jsonSchema: {
		title: 'Form with custom actions',
		type: 'object',
		properties: {
			name: {
				type: 'string',
			},
			requiredField: {
				type: 'string',
			},
		},
		required: ['requiredField'],
	},
	properties: { name: 'lol' },
	uiSchema: ['name', 'requiredField'],
};
