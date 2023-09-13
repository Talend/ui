export const hoverSubmitSchema = {
	jsonSchema: {
		type: 'object',
		title: 'Comment',
		properties: {
			name: {
				type: 'string',
			},
		},
		required: ['name'],
	},
	uiSchema: [
		{
			key: 'name',
			title: 'Name',
		},
	],
	properties: {
		name: 'Chuck Norris',
	},
};
