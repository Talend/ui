import { screen, render } from '@testing-library/react';
import DefaultArrayTemplate from './DefaultArrayTemplate.component';

jest.unmock('@talend/design-system');
jest.mock('ally.js');

const schema = {
	description: 'Tnstructions to fill it',
	key: ['comments'],
	items: [
		{
			key: ['comments', '', 'name'],
			title: 'Name',
			required: true,
			schema: { title: 'Name', type: 'string' },
			type: 'text',
		},
		{
			key: ['comments', '', 'email'],
			title: 'Email',
			description: 'Email will be used for evil.',
			schema: {
				title: 'Email',
				type: 'string',
				pattern: '^\\S+@\\S+$',
				description: 'Email will be used for evil.',
			},
			type: 'text',
		},
		{
			key: ['comments', '', 'comment'],
			type: 'textarea',
			rows: 3,
			title: 'Comment',
			maxlength: 20,
			validationMessage: "Don't be greedy!",
			schema: {
				title: 'Comment',
				type: 'string',
				maxLength: 20,
				validationMessage: "Don't be greedy!",
			},
		},
	],
	title: 'comments',
	required: true,
	schema: {
		type: 'array',
		maxItems: 2,
		items: {
			type: 'object',
			properties: {
				name: { title: 'Name', type: 'string' },
				email: {
					title: 'Email',
					type: 'string',
					pattern: '^\\S+@\\S+$',
					description: 'Email will be used for evil.',
				},
				comment: {
					title: 'Comment',
					type: 'string',
					maxLength: 20,
					validationMessage: "Don't be greedy!",
				},
			},
			required: ['name', 'comment'],
		},
	},
	type: 'array',
};

const value = [
	{
		name: 'Jimmy',
		email: 'jimmy@lol.com',
		comment: "Let's do this",
	},
	{
		name: 'JM',
		email: 'jm@lol.com',
		comment: "Let's do that instead",
	},
	{
		name: 'Goeffroy',
		email: 'geoffroy@lol.com',
		comment: "Don't user ternary !",
	},
];

describe('Default Array Template component', () => {
	it('should render default array template', () => {
		// when
		const { container } = render(
			<DefaultArrayTemplate
				canReorder
				id="my-template"
				onAdd={jest.fn()}
				onRemove={jest.fn()}
				onReorder={jest.fn()}
				renderItem={index => <div>Render item {index}</div>}
				schema={schema}
				value={value}
				errorMessage="This is an error"
				isValid
			/>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render error with error classname', () => {
		// when
		render(
			<DefaultArrayTemplate
				canReorder
				id="my-template"
				onAdd={jest.fn()}
				onRemove={jest.fn()}
				onReorder={jest.fn()}
				renderItem={index => <div>Render item {index}</div>}
				schema={schema}
				value={value}
				errorMessage="This is an error"
				isValid={false}
			/>,
		);

		// then
		expect(screen.getByRole('status').parentElement).toHaveClass('has-error');
	});
	it('should support readonly', () => {
		// when
		render(
			<DefaultArrayTemplate
				canReorder
				id="my-template"
				onAdd={jest.fn()}
				onRemove={jest.fn()}
				onReorder={jest.fn()}
				renderItem={index => <div>Render item {index}</div>}
				schema={{ ...schema, readOnly: true }}
				value={value}
				isValid
			/>,
		);

		// then
		// eslint-disable-next-line jest-dom/prefer-in-document
		expect(screen.queryAllByRole('button')).toHaveLength(0);
	});
});
