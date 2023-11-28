export const errorsSchema = {
	jsonSchema: {
		type: 'object',
		title: 'Comment',
		required: ['fieldname'],
		properties: {
			tabConfiguration: {
				type: 'object',
				properties: {
					fieldname: {
						type: 'string',
					},
				},
			},
			fieldname: {
				type: 'string',
			},
			description: {
				type: 'string',
			},
			tabs: {
				type: 'tabs',
			},
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
			root: {
				type: 'object',
				properties: {
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
		},
	},
	uiSchema: [
		{
			key: 'tabs',
			title: '2 Tabs',
			widget: 'tabs',
			items: [
				{
					key: 'tabConfiguration',
					title: 'Configuration',
					widget: 'fieldset',
					items: [
						{
							key: 'fieldname',
							title: 'Field Name',
						},
					],
				},
				{
					key: 'tabInfo',
					title: 'Info',
					widget: 'fieldset',
					items: [
						{
							key: 'description',
							title: 'Description',
						},
					],
				},
			],
		},
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
			key: 'root.string',
			title: 'string',
		},
		{
			key: 'root.number',
			title: 'number',
		},
		{
			key: 'root.textarea',
			widget: 'textarea',
			title: 'textarea',
			rows: 5,
		},
		{
			key: 'root.checkbox',
			title: 'checkbox',
		},
		{
			key: 'root.multicheckbox',
			title: 'multicheckbox',
		},
		{
			key: 'root.code',
			widget: 'code',
			title: 'code',
			options: {
				language: 'javascript',
				height: '100px',
			},
		},
		{
			key: 'root.datalist',
			restricted: true,
			title: 'datalist',
			widget: 'datalist',
		},
		{
			key: 'root.date',
			title: 'date',
			widget: 'date',
			options: {
				dateFormat: 'DD/MM/YYYY',
			},
		},
		{
			key: 'root.file',
			title: 'file',
			widget: 'file',
		},
		{
			key: 'root.multiSelectTag',
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
			key: 'root.toggle',
			title: 'toggle',
			widget: 'toggle',
		},
		{
			key: 'root.radios',
			title: 'radios',
			widget: 'radios',
		},
		{
			key: 'root.select',
			title: 'select',
		},
		{
			key: 'root.selectmulti',
			title: 'Multiple choices list',
			widget: 'select',
		},
	],
	properties: {
		arrayOfObjects: [{ string: 'string', number: 3 }],
	},
};
