import React from 'react';
import { shallow } from 'enzyme';
import DefaultArrayTemplate from './DefaultArrayTemplate.component';

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
		const wrapper = shallow(
			<DefaultArrayTemplate.WrappedComponent
				canReorder
				id={'my-template'}
				onAdd={jest.fn()}
				onRemove={jest.fn()}
				onReorder={jest.fn()}
				renderItem={index => <div>Render item {index}</div>}
				schema={schema}
				value={value}
				errorMessage={'This is an error'}
				isValid
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render error with error classname', () => {
		// when
		const wrapper = shallow(
			<DefaultArrayTemplate.WrappedComponent
				canReorder
				id={'my-template'}
				onAdd={jest.fn()}
				onRemove={jest.fn()}
				onReorder={jest.fn()}
				renderItem={index => <div>Render item {index}</div>}
				schema={schema}
				value={value}
				errorMessage={'This is an error'}
				isValid={false}
			/>,
		);

		// then
		const message = wrapper.find('Message');
		expect(message.prop('className')).toBe('has-error');
	});
	it('should support readonly', () => {
		// when
		const wrapper = shallow(
			<DefaultArrayTemplate.WrappedComponent
				canReorder
				id={'my-template'}
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
		expect(wrapper.find('Action').length).toBe(0);
	});
});
