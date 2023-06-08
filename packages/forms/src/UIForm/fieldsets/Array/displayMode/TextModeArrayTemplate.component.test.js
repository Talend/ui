import { screen, render } from '@testing-library/react';
import TextModeArrayTemplate from './TextModeArrayTemplate.component';

const schema = {
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

const simpleValue = ['Jimmy', 'JM', 'Geoffroy'];

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

describe('Array Template in text mode', () => {
	it('should render array template with complex items', () => {
		// when
		const { container } = render(
			<TextModeArrayTemplate
				id="my-template"
				renderItem={index => <div data-testid="renderItem">Render item {index}</div>}
				schema={schema}
				value={value}
			/>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
		expect(screen.getAllByTestId('renderItem')).toHaveLength(3);
	});
	it('should render array template with simple items', () => {
		// when
		render(<TextModeArrayTemplate id="my-template" schema={schema} value={simpleValue} />);

		// then
		expect(screen.getAllByRole('listitem')).toHaveLength(3);
		expect(screen.getAllByRole('listitem')[0]).toHaveTextContent('Jimmy');
		expect(screen.getAllByRole('listitem')[1]).toHaveTextContent('JM');
		expect(screen.getAllByRole('listitem')[2]).toHaveTextContent('Geoffroy');
	});
});
