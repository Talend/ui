import React from 'react';
import { shallow } from 'enzyme';
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
		const wrapper = shallow(
			<TextModeArrayTemplate
				id={'my-template'}
				renderItem={index => <div>Render item {index}</div>}
				schema={schema}
				value={value}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render array template with simple items', () => {
		// when
		const wrapper = shallow(
			<TextModeArrayTemplate
				id={'my-template'}
				renderItem={index => <div>Render item {index}</div>}
				schema={schema}
				value={simpleValue}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
