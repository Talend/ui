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

		it('should support readonly', () => {
			// when
			const result = getArrayElementSchema({ ...arraySchema, readOnly: true }, 2);

			// then
			expect(result.items[0].readOnly).toBe(true);
		});

		it('should set schema with items schema', () => {
			const arraySchemaEntry = {
				...arraySchema,
				schema: {
					items: {
						title: 'status',
						type: 'string',
						enum: ['pending', 'success'],
					},
				},
			};
			const result = getArrayElementSchema(arraySchemaEntry, 2);

			expect(result.items[0].schema.title).toBe('status');
			expect(result.items[0].schema.type).toBe('string');
			expect(result.items[0].schema.enum).toEqual(['pending', 'success']);
		});

		it('should set titleMap if items schema enum is provided', () => {
			const arraySchemaEntry = {
				...arraySchema,
				schema: {
					items: {
						title: 'Color',
						type: 'string',
					},
				},
				titleMap: [
					{ name: 'White', value: 'White' },
					{ name: 'Lemon', value: 'Lemon' },
					{ name: 'Khaki', value: 'Khaki' },
				],
			};
			const result = getArrayElementSchema(arraySchemaEntry, 2);

			expect(result.items[0].titleMap).toEqual([
				{ name: 'White', value: 'White' },
				{ name: 'Lemon', value: 'Lemon' },
				{ name: 'Khaki', value: 'Khaki' },
			]);
		});
	});
});
