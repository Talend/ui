import { getArrayElementItems, getArrayElementSchema } from './array';

const arraySchema = {
	key: ['comments', 'lol'],
	items: [
		{
			key: ['comments', 'lol', '', 'name'],
			title: 'Name',
			type: 'text',
		},
		{
			key: ['comments', 'lol', '', 'email'],
			title: 'Email',
			description: 'Email will be used for evil.',
			type: 'text',
		},
		{
			key: ['comments', 'lol', '', 'comment'],
			type: 'textarea',
			rows: 3,
			title: 'Comment',
			maxLength: 20,
		},
	],
	itemTitle: 'comment',
	title: 'comments',
	type: 'array',
};

describe('Array utils', () => {
	describe('#getArrayElementItems', () => {
		it('should insert element index in keys', () => {
			// when
			const result = getArrayElementItems(arraySchema, 2);

			// then
			expect(result).toEqual([
				{
					key: ['comments', 'lol', 2, 'name'],
					title: 'Name',
					type: 'text',
				},
				{
					key: ['comments', 'lol', 2, 'email'],
					title: 'Email',
					description: 'Email will be used for evil.',
					type: 'text',
				},
				{
					key: ['comments', 'lol', 2, 'comment'],
					type: 'textarea',
					rows: 3,
					title: 'Comment',
					maxLength: 20,
				},
			]);
		});

		it('should insert element index in keys', () => {
			// given
			const arraySchemaWithNestedFieldsets = {
				...arraySchema,
				items: [
					{
						widget: 'fieldset',
						items: [
							{
								key: ['comments', 'lol', '', 'name'],
								title: 'Name',
								type: 'text',
							},
							{
								key: ['comments', 'lol', '', 'email'],
								title: 'Email',
								description: 'Email will be used for evil.',
								type: 'text',
							},
							{
								key: ['comments', 'lol', '', 'comment'],
								type: 'textarea',
								rows: 3,
								title: 'Comment',
								maxlength: 20,
							},
						],
					},
				],
			};

			// when
			const result = getArrayElementItems(arraySchemaWithNestedFieldsets, 2);

			// then
			expect(result).toEqual([
				{
					widget: 'fieldset',
					items: [
						{
							key: ['comments', 'lol', 2, 'name'],
							title: 'Name',
							type: 'text',
						},
						{
							key: ['comments', 'lol', 2, 'email'],
							title: 'Email',
							description: 'Email will be used for evil.',
							type: 'text',
						},
						{
							key: ['comments', 'lol', 2, 'comment'],
							type: 'textarea',
							rows: 3,
							title: 'Comment',
							maxlength: 20,
						},
					],
				},
			]);
		});
	});

	describe('#getArrayElementSchema', () => {
		it('should insert the title', () => {
			// when
			const result = getArrayElementSchema(arraySchema, 2);

			// then
			expect(result.title).toEqual('comment');
		});

		it('should insert the key', () => {
			// when
			const result = getArrayElementSchema(arraySchema, 2);

			// then
			expect(result.key).toEqual(['comments', 'lol', 2]);
		});

		it('should adapt items key', () => {
			// when
			const result = getArrayElementSchema(arraySchema, 2);

			// then
			expect(result.items).toEqual([
				{
					key: ['comments', 'lol', 2, 'name'],
					title: 'Name',
					type: 'text',
				},
				{
					key: ['comments', 'lol', 2, 'email'],
					title: 'Email',
					description: 'Email will be used for evil.',
					type: 'text',
				},
				{
					key: ['comments', 'lol', 2, 'comment'],
					type: 'textarea',
					rows: 3,
					title: 'Comment',
					maxLength: 20,
				},
			]);
		});

		it('should set widget to default widget', () => {
			// when
			const result = getArrayElementSchema(arraySchema, 2);

			// then
			expect(result.widget).toEqual('fieldset');
		});

		it('should set widget to defined itemWidget', () => {
			// when
			const result = getArrayElementSchema({ ...arraySchema, itemWidget: 'collapsiblePanel' }, 2);

			// then
			expect(result.widget).toEqual('collapsiblePanel');
		});
	});
});
