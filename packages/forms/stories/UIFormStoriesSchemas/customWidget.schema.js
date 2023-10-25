export const customWidgetSchema = {
	jsonSchema: {
		title: 'Unknown widget',
		type: 'object',
		properties: {
			list: {
				type: 'string',
				enum: ['one', 'two', 'three'],
				enumNames: ['One', 'Two', 'Three'],
			},
		},
	},
	properties: {
		list: 'two',
	},
	uiSchema: [
		{
			key: 'list',
			type: 'custom',
		},
	],
};
