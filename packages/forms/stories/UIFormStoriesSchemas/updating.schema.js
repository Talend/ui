export const updatingSchema = {
	jsonSchema: {
		type: 'object',
		title: 'Comment',
		properties: {
			arrayOfObjects: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						string: {
							type: 'string',
						},
						number: {
							type: 'number',
						},
					},
					required: ['string', 'number'],
				},
			},
			string: {
				type: 'string',
			},
			number: {
				type: 'number',
			},
			textarea: {
				type: 'string',
			},
			checkbox: {
				type: 'boolean',
			},
			multicheckbox: {
				type: 'array',
				items: {
					type: 'string',
					enum: ['foo', 'bar', 'fuzz', 'qux'],
				},
			},
			code: {
				type: 'string',
			},
			datalist: {
				type: 'string',
				enum: ['Apple', 'Pine[apple]', 'Banana', 'Cher[ry', 'Lemo}n', 'Grapefruit'],
			},
			date: {
				type: 'string',
			},
			file: {
				type: 'string',
			},
			multiSelectTag: {
				type: 'array',
				items: {
					type: 'string',
					enum: ['Apple'],
				},
			},
			radios: {
				type: 'string',
				enum: ['foo', 'bar', 'fuzz', 'qux'],
			},
			toggle: {
				type: 'boolean',
			},
			select: {
				type: 'string',
				enum: ['foo', 'bar', 'fuzz', 'qux'],
			},
			selectmulti: {
				type: 'array',
				items: {
					type: 'string',
					enum: ['foo', 'bar', 'fuzz', 'qux'],
				},
				uniqueItems: true,
			},
		},
	},
	uiSchema: [
		{
			key: 'arrayOfObjects',
			title: 'Array of objects',
			itemTitle: 'Array element',
			items: [
				{
					key: 'arrayOfObjects[].string',
					title: 'string',
				},
				{
					key: 'arrayOfObjects[].number',
					title: 'number',
				},
			],
		},
		{
			key: 'string',
			title: 'string',
		},
		{
			key: 'number',
			title: 'number',
		},
		{
			key: 'textarea',
			widget: 'textarea',
			title: 'textarea',
			rows: 5,
		},
		{
			key: 'checkbox',
			title: 'checkbox',
		},
		{
			key: 'multicheckbox',
			title: 'multicheckbox',
		},
		{
			key: 'code',
			widget: 'code',
			title: 'code',
			options: {
				language: 'javascript',
				height: '100px',
			},
		},
		{
			key: 'datalist',
			restricted: true,
			title: 'datalist',
			widget: 'datalist',
		},
		{
			key: 'date',
			title: 'date',
			widget: 'date',
			options: {
				dateFormat: 'DD/MM/YYYY',
			},
		},
		{
			key: 'file',
			title: 'file',
			widget: 'file',
		},
		{
			key: 'multiSelectTag',
			title: 'multiSelectTag',
			widget: 'multiSelectTag',
			titleMap: [
				{
					name: 'Apple12',
					value: 'Apple',
				},
			],
		},
		{
			key: 'toggle',
			title: 'toggle',
			widget: 'toggle',
		},
		{
			key: 'radios',
			title: 'radios',
			widget: 'radios',
		},
		{
			key: 'select',
			title: 'select',
		},
		{
			key: 'selectmulti',
			title: 'Multiple choices list',
			widget: 'select',
		},
	],
	properties: {
		arrayOfObjects: [{ string: 'string', number: 3 }],
	},
};
